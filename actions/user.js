import firebase from 'firebase';
import db from '../config/firebase';
import {UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_USERNAME, UPDATE_BIO, SIGN_IN, SIGN_OUT} from '../types';

export const updateEmail = (email) => {
	return {type: UPDATE_EMAIL, payload: email}
}

export const updatePassword = (password) => {
	return {type: UPDATE_PASSWORD, payload: password}
}

export const updateUsername = (username) => {
	return {type: UPDATE_USERNAME, payload: username}
}

export const updateBio = (bio) => {
	return {type: UPDATE_BIO, payload: bio}
}

export const login = () => async (dispatch, getState) => {
	try {
		const { email, password } = getState().user
		const response = await firebase.auth().signInWithEmailAndPassword(email, password)
		dispatch(getUser(response.user.uid))
	} catch (e) {
		alert(e)
	}
}

export const getUser = (uid) => async (dispatch, getState) => {
	try {
		const user = await db.collection('users').doc(uid).get()
		dispatch({type: SIGN_IN, payload: user.data()})
	} catch (e) {
		alert(e)
	}
}

export const signOut = () => dispatch => {
	firebase.auth().signOut();
	dispatch( {type: SIGN_OUT})
}


export const signup = () => async (dispatch, getState) => {
	try {
		const { email, password, username, bio } = getState().user
		const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
		if(response.user.uid) {
			const user = {
				uid: response.user.uid,
				email: email,
				username: username,
				bio: bio,
				photo: 'https://firebasestorage.googleapis.com/v0/b/crav-eat-full-stack.appspot.com/o/no-img.png?alt=media&token=1db1f8f7-9eba-4a8f-8df7-37ea638e9dc0',
				token: null,
			}
			db.collection('users').doc(response.user.uid).set(user)
			dispatch({type: SIGN_IN, payload: user})
		}
	} catch (e) {
		alert(e)
	}
}