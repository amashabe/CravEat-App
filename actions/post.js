import firebase from 'firebase';
import db from '../config/firebase';
import {UPDATE_DESCRIPTION, GET_POSTS, UPDATE_RECIPE, UPDATE_PHOTO,UPDATE_LOCATION} from '../types';

export const updateDescription = (text) => {
	return {type: UPDATE_DESCRIPTION, payload: text}
}

export const updateRecipe = (text) => {
	return {type: UPDATE_RECIPE, payload: text}
}

export const updatePhoto = (text) => {
	return {type: UPDATE_PHOTO, payload: text}
}

export const updateLocation = (text) => {
	return {type: UPDATE_LOCATION, payload: text}
}

export const uploadPost = () => async (dispatch, getState) => {
		try {

			const { post, user } = getState();
			const upload = {
				postPhoto: post.photo,
				postDescription: post.description,
				uid: user.uid,
				photo: user.photo,
				username: user.username,
				postRecipe: post.recipe,
				postLocation: post.location,
				createdAt: new Date().toISOString(),
				likes: []
			}
			const ref = await db.collection('posts').doc()
			upload.id = ref.id
			ref.set(upload)

		} catch (e) {
			alert(e)
		}
}

export const getPosts = () => async (dispatch, getState) => {
		try {
			const posts = await db.collection('posts').get()
			
			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
			})
			dispatch({type: GET_POSTS, payload: array})
		} catch (e) {
			alert(e)
		}
}

export const likePost = (post) => (dispatch, getState) => {
	const { uid } = getState().user
	try {
		db.collection('posts').doc(post.id).update({
			likes: firebase.firestore.FieldValue.arrayUnion(uid)
		})
		dispatch(getPosts())
	} catch(e) {
		console.error(e)
	}
}

export const unlikePost = (post) => async (dispatch, getState) => {
	const { uid } = getState().user
	try {
		db.collection('posts').doc(post.id).update({
			likes: firebase.firestore.FieldValue.arrayRemove(uid)
		})
		dispatch(getPosts())
	} catch(e) {
		console.error(e)
	}
}