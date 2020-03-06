import firebase from 'firebase';
import {UPDATE_PHOTO} from '../types';

export const uploadImage = (url) => async (dispatch) => {
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
                dispatch ({type: UPDATE_PHOTO, payload: downloadURL})
                }
            );
        });
}