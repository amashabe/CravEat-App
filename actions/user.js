import firebase from "firebase";
import { Keyboard } from "react-native";
import db from "../config/firebase";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import md5 from "react-native-md5";
import { getPosts } from "./post";
import { UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_USERNAME, UPDATE_BIO, SIGN_IN, SIGN_OUT, LOADING, SET_ERROR, SET_TOKEN, GET_ALL_USERS, UPDATE_PROFILE_PICTURE, GET_PROFILE, UPDATE_LOCATION } from "../types";

export const updateEmail = (email) => {
  return { type: UPDATE_EMAIL, payload: email }
}

export const updateToken = (text) => {
  return { type: SET_TOKEN, payload: text }
}

export const updatePassword = (password) => {
  return { type: UPDATE_PASSWORD, payload: password }
}

export const updateUsername = (username) => {
  return { type: UPDATE_USERNAME, payload: username }
}

export const updateBio = (bio) => {
  return { type: UPDATE_BIO, payload: bio }
}

export const updateLocation = (text) => {
  return { type: UPDATE_LOCATION, payload: text }
}

export const updatePP = () => async (dispatch, getState) => {
  const { uid } = getState().user;
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
  });
  if (!result.cancelled) {
    dispatch({ type: LOADING, payload: true });
    const respond = await fetch(result.uri);
    const file = await respond.blob();
    const storageRef = firebase.storage().ref();
    const metadata = { contentType: "image/jpeg" };
    let uploadTask = storageRef
      .child("ProfilePicture/" + uid)
      .put(file, metadata);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { },
      (error) => {
        alert(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.collection("users").doc(uid).update({ photo: downloadURL });
          dispatch(batchUpdate(downloadURL, uid));
          dispatch({ type: LOADING, payload: false });
        });
      }
    );
  }
};

export const batchUpdate = (downloadURL, uid) => async (dispatch, getState) => {
  try {
    const batch = db.batch();
    const posts = await db.collection("posts").get();
    const comments = await db.collection("comments").get();

    let array = [];
    posts.forEach((post) => {
      if (post.data().uid === uid) {
        array.push(post.data());
      }
    });

    let array2 = [];
    comments.forEach((comment) => {
      if (comment.data().commenterId === uid) {
        array2.push(comment.data());
      }
    });

    array2.map((doc) => {
      const comment = db.doc(`/comments/${doc.id}`);
      batch.update(comment, { commenterPhoto: downloadURL });
    });

    array.map((doc) => {
      const post = db.doc(`/posts/${doc.id}`);
      batch.update(post, { photo: downloadURL });
    });

    batch.commit();
    dispatch({ type: UPDATE_PROFILE_PICTURE, payload: downloadURL });
    dispatch(getPosts());
    dispatch(getUser(uid, "PROFILE"));
  } catch (error) {
    alert(error);
  }
};

export const login = () => async (dispatch, getState) => {
  Keyboard.dismiss();
  dispatch({ type: LOADING, payload: true });
  dispatch({ type: SET_ERROR, payload: null });
  const { email, password, token } = getState().user;
  if (email !== undefined && password !== undefined) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        dispatch({ type: LOADING, payload: false });
        dispatch({ type: SET_ERROR, payload: null });
        dispatch(getUser(response.user.uid));
      })
      .catch((error) => {
        dispatch({ type: LOADING, payload: false });
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch({ type: SET_ERROR, payload: errorMessage });
      });
  } else {
    dispatch({ type: LOADING, payload: false });
    dispatch({ type: SET_ERROR, payload: "Fill all required fields" });
  }
};

export const getUser = (uid, type) => async (dispatch, getState) => {
  const { token } = getState().user;
  console.log(type)
  try {
    const users = await db.collection("users").get();
    users.forEach((user) => {
      if (user.data().token === token && user.data().uid != uid) {
        db.collection("users").doc(user.data().uid).update({ token: null });
      } else if (user.data().uid === uid) {
        db.collection("users")
          .doc(uid)
          .onSnapshot((querySnapshot) => {
            db.collection("users").doc(uid).update({ token: token });
            if (type === SIGN_IN) {
              dispatch({ type: SIGN_IN, payload: querySnapshot.data() });
            }
            dispatch({ type: GET_PROFILE, payload: user.data() });
          });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const signOut = () => (dispatch) => {
  firebase.auth().signOut();
  dispatch({ type: SIGN_OUT });
  dispatch({ type: UPDATE_BIO, payload: "" });
  dispatch({ type: UPDATE_USERNAME, payload: "" });
  dispatch({ type: UPDATE_EMAIL, payload: "" });
  dispatch({ type: UPDATE_PASSWORD, payload: "" });
};

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    const users = await db.collection("users").get();
    let array = [];
    users.forEach((user) => {
      array.push(user.data());
    });
    dispatch({ type: GET_ALL_USERS, payload: array });
  } catch (error) {
    alert(error);
  }
};

export const signup = () => (dispatch, getState) => {
  Keyboard.dismiss();
  const hex_md5v = md5.hex_md5(Date.now() + "");
  dispatch({ type: LOADING, payload: true });
  const { email, password, username, bio, token, location } = getState().user;
  if (email === undefined || password === undefined || username === undefined || bio === undefined || location.name === undefined) {
    dispatch({ type: LOADING, payload: false });
    dispatch({ type: SET_ERROR, payload: "Fill all required fields" });
  } else if (email !== undefined && password !== undefined) {
    dispatch({ type: SET_ERROR, payload: null });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const user = {
          uid: response.user.uid,
          email: email,
          username: username,
          bio: bio,
          photo: `http://gravatar.com/avatar/${hex_md5v}?d=identicon`,
          token: token ? token : null,
          followers: [],
          following: [],
          createdAt: new Date().getTime(),
          location: location.name
        };
        db.collection("users").doc(response.user.uid).set(user);
        dispatch({ type: LOADING, payload: false });
        dispatch({ type: SIGN_IN, payload: user });
      })
      .catch((error) => {
        dispatch({ type: LOADING, payload: false });
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch({ type: SET_ERROR, payload: errorMessage });
      });
  }
};

export const updateUserDetails = (navigate) => async (dispatch, getState) => {
  dispatch({ type: LOADING, payload: true });
  const { username, bio, uid } = getState().user;

  db.collection("users").doc(uid).update({ username: username, bio: bio });
  const batch = db.batch();
  const posts = await db.collection("posts").get();

  let array = [];
  posts.forEach((post) => {
    if (post.data().uid === uid) {
      array.push(post.data());
    }
  });

  array.map((doc) => {
    const post = db.doc(`/posts/${doc.id}`);
    batch.update(post, { username: username });
  });
  batch.commit();
  navigate.navigate("MyProfile");
  dispatch(getUser(uid));
  dispatch(getPosts());
  dispatch({ type: LOADING, payload: false });
};

export const followUser = (user) => async (dispatch, getState) => {
  const { uid, photo, username } = getState().user;
  try {
    db.collection("users").doc(user.uid).update({
      followers: firebase.firestore.FieldValue.arrayUnion(uid)
    })

    db.collection("users").doc(uid).update({
      following: firebase.firestore.FieldValue.arrayUnion(user.uid)
    })

    const notifications = await db.collection("notifications").get();
    notifications.forEach((notification) => {
      if (notification.data().followerId != uid && notification.data().uid != user.uid) {
        db.collection("notifications").doc().set({
          followerId: uid,
          followerPhoto: photo,
          followerName: username,
          uid: user.uid,
          photo: user.photo,
          username: user.username,
          createdAt: new Date().getTime(),
          type: "FOLLOWER",
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const unfollowUser = (user) => async (dispatch, getState) => {
  const { uid, photo, username } = getState().user;
  try {
    db.collection("users").doc(user.uid).update({
      followers: firebase.firestore.FieldValue.arrayRemove(uid)
    });
    db.collection("users").doc(uid).update({
      following: firebase.firestore.FieldValue.arrayRemove(user.uid)
    })
  } catch (e) {
    console.log(e);
  }
};
