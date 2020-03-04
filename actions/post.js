import firebase from 'firebase';
import db from '../config/firebase';
import {UPDATE_DESCRIPTION, GET_POSTS, UPDATE_RECIPE} from '../types';

export const updateDescription = (text) => {
	return {type: UPDATE_DESCRIPTION, payload: text}
}

export const updateRecipe = (text) => {
	return {type: UPDATE_RECIPE, payload: text}
}

export const uploadPost = () => async (dispatch, getState) => {
		try {
			const { post, user } = getState()
			const upload = {
				postPhoto: 'https://firebasestorage.googleapis.com/v0/b/crav-eat-full-stack.appspot.com/o/meal-918639_640.jpg?alt=media&token=53fb6f0c-b398-4a88-ac24-0397df8bf35d',
				postDescription: post.description,
				uid: user.uid,
				photo: user.photo,
				username: user.username,
				postRecipe: post.recipe
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