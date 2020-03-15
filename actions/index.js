import firebase from 'firebase';
import { UPDATE_PHOTO } from '../types';
import db from '../config/firebase';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {GET_TOKEN} from '../types';

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

export const uploadImage = (url) => async (dispatch) => {
    const respond = await fetch(url);
    const file = await respond.blob();
    const newPostKey = firebase.database().ref().child('posts').push().key;
    const metadata = { contentType: 'image/jpeg' };
    let uploadTask = firebase.storage().ref().child('images/' + newPostKey).put(file, metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
        }, (error) => {
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                dispatch({ type: UPDATE_PHOTO, payload: downloadURL })
            }
            );
        });
}

export const allowNotifications = () => {
    return async ( dispatch, getState ) => {
      const { uid } = getState().user
      try {
        const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        if (permission.status === 'granted') {
          const token = await Notifications.getExpoPushTokenAsync()
          dispatch({ type: GET_TOKEN, payload: token })
          db.collection('users').doc(uid).update({ token: token })      
        }
      } catch(e) {
        console.error(e)
      }
    }
  }
  
  export const sendNotification = (uid, text) => {
    return async (dispatch, getState) => {
      const { username } = getState().user
      try {
        const user = await db.collection('users').doc(uid).get()
        if(user.data().token){
          fetch(PUSH_ENDPOINT, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: user.data().token,
              title: username,
              body: text,
            })
          })
        }
      } catch(e) {
        console.error(e)
      }
    }
  }