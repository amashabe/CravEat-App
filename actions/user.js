import firebase from 'firebase';
import db from '../config/firebase';
import { UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_USERNAME, UPDATE_BIO, SIGN_IN, SIGN_OUT, LOADING, SET_ERROR } from '../types';

export const updateEmail = (email) => {
	return {
		type: UPDATE_EMAIL, payload: email
	}
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

export const getValidator = text => dispatch => {
	switch (text) {
		case "auth/argument-error":
			return dispatch({ type: SET_ERROR, payload: 'Email and Password must be a valid string' });
		case "auth/user-not-found":
			return dispatch({ type: SET_ERROR, payload: 'Email and Password Incorrect.' });
		default:
			return dispatch({ type: SET_ERROR, payload: 'Email and Password Incorrect.' });
	}

}

export const login = () => (dispatch, getState) => {
	// try {
	// 	dispatch({ type: LOADING, payload: true });
	// 	const { email, password } = getState().user;
	// 	if (email !== undefined && password !== undefined) {
	// 		const response = await firebase.auth().signInWithEmailAndPassword(email, password);
	// 		dispatch(getUser(response.user.uid));
	// 	}
	// 	else {
	// 		dispatch({ type: LOADING, payload: false });
	// 		dispatch({ type: SET_ERROR, payload: "Fill all required fields" })
	// 	}

	// } catch (e) {
	// 	dispatch({ type: LOADING, payload: false })
	// 	dispatch(getValidator(e.code))
	// }
	dispatch({ type: LOADING, payload: true });
	dispatch({ type: SET_ERROR, payload: null })
	const { email, password } = getState().user;
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

export const getUser = (uid) => async (dispatch, getState) => {
	try {
		const user = await db.collection('users').doc(uid).get()
		dispatch({ type: SIGN_IN, payload: user.data() })
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

export const signup = () => (dispatch, getState) => {
	dispatch({ type: LOADING, payload: true })
	const { email, password, username, bio } = getState().user;
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
				photo: 'https://firebasestorage.googleapis.com/v0/b/crav-eat-full-stack.appspot.com/o/no-img.png?alt=media&token=1db1f8f7-9eba-4a8f-8df7-37ea638e9dc0',
				token: null,
				followed: [],
				following: []
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