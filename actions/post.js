import firebase from 'firebase';
import db from '../config/firebase';
import { UPDATE_DESCRIPTION, GET_POSTS, UPDATE_RECIPE, UPDATE_PHOTO, UPDATE_LOCATION, GET_COMMENTS, GET_POST, GET_USER_POSTS } from '../types';
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy';

export const clearPhoto = () => {
	return { type: UPDATE_PHOTO, payload: '' }
}

export const updateDescription = (text) => {
	return { type: UPDATE_DESCRIPTION, payload: text }
}

export const updateRecipe = (text) => {
	return { type: UPDATE_RECIPE, payload: text }
}

export const updatePhoto = (text) => {
	return { type: UPDATE_PHOTO, payload: text }
}

export const updateLocation = (text) => {
	return { type: UPDATE_LOCATION, payload: text }
}

export const getPost = (postId, navigate) => async (dispatch) => {
	const post = await db.collection('posts').doc(postId).get()

	dispatch({ type: GET_POST, payload: post.data() })
	navigate.navigate('Comment', post.data())
}

export const uploadPost = () => async (dispatch, getState) => {
	const { post, user } = getState();
	let newPosts = cloneDeep(post.feed.reverse())
	try {
		const upload = {
			postPhoto: post.photo,
			postDescription: post.description,
			uid: user.uid,
			photo: user.photo,
			username: user.username,
			postRecipe: post.recipe,
			postLocation: post.location,
			createdAt: new Date().getTime(),
			likes: [],
			comments: [],
			email: user.email
		}
		const ref = await db.collection('posts').doc()
		upload.id = ref.id
		ref.set(upload)
		newPosts.push(upload)
		dispatch({ type: UPDATE_PHOTO, payload: '' })
		dispatch({ type: UPDATE_LOCATION, payload: '' })
		dispatch({ type: UPDATE_DESCRIPTION, payload: '' })
		dispatch({ type: UPDATE_RECIPE, payload: '' })
	} catch (e) {
		alert(e)
	}
}

export const getPosts = () => (dispatch, getState) => {
	try {
		db.collection('posts').onSnapshot((querySnapshot) => {
			console.log('updated')
			let array = []
			querySnapshot.forEach((post) => {
				array.push(post.data())
			})
			dispatch({ type: GET_POSTS, payload: orderBy(array, 'createdAt', 'desc') })
		})
	} catch (e) {
		alert(e)
	}
}

export const getUserPosts = () => async (dispatch, getState) => {
	try {
		const { user } = getState();
		const posts = await db.collection('posts').get()

		let array = []
		posts.forEach((post) => {
			if (user.uid === post.data().uid) {
				array.push(post.data())
			}
		})
		dispatch({ type: GET_USER_POSTS, payload: orderBy(array, 'createdAt', 'desc') })
	} catch (e) {
		alert(e)
	}
}

export const likePost = (post) => (dispatch, getState) => {
	const { uid, username, photo } = getState().user
	try {
		db.collection('posts').doc(post.id).update({
			likes: firebase.firestore.FieldValue.arrayUnion(uid)
		})
		if (uid !== post.uid) {
			db.collection('notifications').doc().set({
				postId: post.id,
				postPhoto: post.postPhoto,
				likerId: uid,
				likerPhoto: photo,
				likerName: username,
				uid: post.uid,
				createdAt: new Date().getTime(),
				type: 'LIKE',
				read: false
			})
		}

		dispatch(getPosts())
	} catch (e) {
		alert(e)
	}
}

export const unlikePost = (post) => async (dispatch, getState) => {
	const { uid } = getState().user;
	try {
		db.collection('posts').doc(post.id).update({
			likes: firebase.firestore.FieldValue.arrayRemove(uid)
		})
		const query = await db.collection('notifications').where('postId', '==', post.id).where('likerId', '==', uid).get();
		query.forEach((response) => {
			response.ref.delete()
		})
		dispatch(getPosts())
	} catch (e) {
		console.error(e)
	}
}

export const getNextPropsComments = (comments) => dispatch => {
	dispatch({ type: GET_COMMENTS, payload: orderBy(comments, 'createdAt', 'desc') })
}

export const getComments = (post) => dispatch => {
	dispatch({ type: GET_COMMENTS, payload: orderBy(post.comments, 'createdAt', 'desc') })
}

export const addComment = (text, post) => async (dispatch, getState) => {
	const { uid, photo, username } = getState().user
	let newComments = cloneDeep(getState().post.comments.reverse())
	try {
		const comment = {
			comment: text,
			commenterId: uid,
			commenterPhoto: photo,
			commenterName: username,
			createdAt: new Date().getTime(),
		}
		db.collection('posts').doc(post.id).update({
			comments: firebase.firestore.FieldValue.arrayUnion(comment)
		})
		comment.postId = post.id
		comment.postPhoto = post.postPhoto
		comment.uid = post.uid
		comment.type = 'COMMENT'
		comment.read = false
		newComments.push(comment)

		dispatch({ type: GET_COMMENTS, payload: newComments.reverse() })

		if (uid !== post.uid) {
			db.collection('notifications').doc().set(comment)
		}
	} catch (e) {
		console.error(e)
	}
}
