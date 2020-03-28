import firebase from 'firebase';
import { Keyboard } from 'react-native';
import db from '../config/firebase';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { getPosts } from './post';
import { UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_USERNAME, UPDATE_BIO, SIGN_IN, SIGN_OUT, LOADING, SET_ERROR, SET_TOKEN, GET_ALL_USERS, UPDATE_PROFILE_PICTURE, GET_PROFILE } from '../types';

export const updateEmail = (email) => {
	return {
		type: UPDATE_EMAIL, payload: email
	}
}

export const updateToken = text => {
	return { type: SET_TOKEN, payload: text }
}

export const updatePassword = (password) => {
	return {
		type: UPDATE_PASSWORD, payload: password,
	}
}

export const updateUsername = (username) => {
	return {
		type: UPDATE_USERNAME, payload: username,
	}
}

export const updateBio = (bio) => {
	return {
		type: UPDATE_BIO, payload: bio,
	}
}

export const updatePP = () => async (dispatch, getState) => {
	const { uid } = getState().user
	if (Constants.platform.ios) {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		if (status !== 'granted') {
			alert('Sorry, we need camera roll permissions to make this work!');
		}
	}

	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [4, 3],
	});
	if (!result.cancelled) {
		dispatch({ type: LOADING, payload: true })
		const respond = await fetch(result.uri);
		const file = await respond.blob();
		const storageRef = firebase.storage().ref();
		const metadata = { contentType: 'image/jpeg' };
		let uploadTask = storageRef.child('ProfilePicture/' + uid).put(file, metadata);
		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
			(snapshot) => {
				let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				if (progress === 0) {

				}
				if (progress === 100) {

				}

			}, (error) => {
				console.log(error)
			}, () => {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					db.collection('users').doc(uid).update({ photo: downloadURL })
					dispatch(updateData(downloadURL, uid))
					dispatch({ type: LOADING, payload: false })
				}
				);
			});
	}
}

export const updateData = (downloadURL, uid) => async (dispatch) => {
	try {
		const batch = db.batch();
		const posts = await db.collection('posts').get()

		let array = []
		posts.forEach((post) => {
			if (post.data().uid === uid) {
				array.push(post.data())
			}

		})
		array.map(doc => {
			const post = db.doc(`/posts/${doc.id}`);
			batch.update(post, { photo: downloadURL });
		})
		batch.commit();
		dispatch({ type: UPDATE_PROFILE_PICTURE, payload: downloadURL })
		dispatch(getPosts())
		dispatch(getUser(uid))
	} catch (error) {
		alert(error)
	}
}

export const login = () => async (dispatch, getState) => {
	Keyboard.dismiss();
	dispatch({ type: LOADING, payload: true });
	dispatch({ type: SET_ERROR, payload: null })
	const { email, password, token } = getState().user;
	if (email !== undefined && password !== undefined) {
		firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
			dispatch({ type: LOADING, payload: false });
			dispatch({ type: SET_ERROR, payload: null })
			dispatch(getUser(response.user.uid));
		}).catch(error => {
			dispatch({ type: LOADING, payload: false })
			const errorCode = error.code;
			const errorMessage = error.message;
			dispatch({ type: SET_ERROR, payload: errorMessage })
		})
	} else {
		dispatch({ type: LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: "Fill all required fields" })
	}
}

export const getUser = (uid, type) => async (dispatch, getState) => {
	const { token } = getState().user
	try {
		const user = await db.collection('users').doc(uid).get()
		if (type === SIGN_IN) {
			token ? await db.collection('users').doc(uid).update({ token: token }) : null
			dispatch({ type: SIGN_IN, payload: user.data() })
		}
		else {
			dispatch({ type: GET_PROFILE, payload: user.data() })
		}
	} catch (e) {
		alert(e)
	}
}

export const signOut = () => dispatch => {
	firebase.auth().signOut();
	dispatch({ type: SIGN_OUT })
	dispatch({ type: UPDATE_BIO, payload: '' })
	dispatch({ type: UPDATE_USERNAME, payload: '' })
	dispatch({ type: UPDATE_EMAIL, payload: '' })
	dispatch({ type: UPDATE_PASSWORD, payload: '' })
}

export const updateUser = () => async (dispatch, getState) => {
	const { uid, username, photo, bio } = getState().user;
	try {
		db.collection('users/').doc(uid).update({
			username: username,
			bio: bio,
			photo: photo
		})
	} catch (e) {
		alert(e)
	}
}

export const getAllUsers = () => async (dispatch, getState) => {
	try {
		const users = await db.collection('users').get();
		let array = [];
		users.forEach((user) => {
			array.push(user.data())
		})
		dispatch({ type: GET_ALL_USERS, payload: array })
	} catch (error) {
		alert(error)
	}
}

export const signup = () => (dispatch, getState) => {
	Keyboard.dismiss();
	dispatch({ type: LOADING, payload: true })
	const { email, password, username, bio, token } = getState().user;
	if (email === undefined || password === undefined || username === undefined || bio === undefined) {
		dispatch({ type: LOADING, payload: false })
		dispatch({ type: SET_ERROR, payload: "Fill all required fields" })
	}
	else if (email !== undefined && password !== undefined) {
		dispatch({ type: SET_ERROR, payload: null })
		firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
			const user = {
				uid: response.user.uid,
				email: email,
				username: username,
				bio: bio,
				photo: 'https://firebasestorage.googleapis.com/v0/b/crav-eat-full-stack.appspot.com/o/pp.jpg?alt=media&token=8a48ae8e-730e-4213-9ce7-e8e295898921',
				token: token ? token : null,
				followed: [],
				following: [],
				createdAt: new Date().getTime(),
			}
			db.collection('users').doc(response.user.uid).set(user)
			dispatch({ type: LOADING, payload: false })
			dispatch({ type: SIGN_IN, payload: user })
		}).catch(error => {
			dispatch({ type: LOADING, payload: false })
			const errorCode = error.code;
			const errorMessage = error.message;
			dispatch({ type: SET_ERROR, payload: errorMessage })
		})
	}

}


export const updateUserDetails = (navigate) => async (dispatch, getState) => {
	dispatch({ type: LOADING, payload: true })
	const { username, bio, uid } = getState().user;

	db.collection('users').doc(uid).update({ username: username, bio: bio });
	const batch = db.batch();
	const posts = await db.collection('posts').get();

	let array = []
	posts.forEach((post) => {
		if (post.data().uid === uid) {
			array.push(post.data())
		}
	});

	array.map(doc => {
		const post = db.doc(`/posts/${doc.id}`);
		console.log(post)
		batch.update(post, { username: username });
	});
	batch.commit();
	dispatch(getUser(uid));
	dispatch(getPosts());
	dispatch({ type: LOADING, payload: false })
	navigate.navigate('MyProfile')
}