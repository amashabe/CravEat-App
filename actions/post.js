import firebase from 'firebase';
import db from '../config/firebase';
import {UPDATE_DESCRIPTION, GET_POSTS, UPDATE_RECIPE, UPDATE_UPLOAD_IMAGE} from '../types';

export const updateDescription = (text) => {
	return {type: UPDATE_DESCRIPTION, payload: text}
}

export const updateRecipe = (text) => {
	return {type: UPDATE_RECIPE, payload: text}
}

export const updatePostPhoto = (text) => {
	return {type: UPDATE_UPLOAD_IMAGE, payload: text}
}

export const getDownloadUrl = (url) => async (dispatch) => {
	try {
		const respond = await fetch(url);
		const file = await respond.blob();
		const newPostKey = firebase.database().ref().child('posts').push().key;
		const metadata = { contentType: 'image/jpeg' };
		let uploadTask = firebase.storage().ref().child('images/' + newPostKey).put(file, metadata);
		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
			(snapshot) => {
			}, (error) => {
				console.log(error)
			}, () => {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					dispatch({type: UPDATE_UPLOAD_IMAGE, payload: downloadURL})
					}
				);
			});

	} catch (e) {
		alert(e)
	}
}

export const uploadPost = () => async (dispatch, getState) => {
		try {
			const { post, user } = getState();
			dispatch(getDownloadUrl(post.photo))
			const upload = {
				postPhoto: post.photo,
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