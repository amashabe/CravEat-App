import firebase from 'firebase';
require('firebase/firestore')

const config = {
  apiKey: "AIzaSyBPKDre3TwwmHck9WewIsfGiLutfBd3q7E",
  authDomain: "crav-eat-full-stack.firebaseapp.com",
  databaseURL: "https://crav-eat-full-stack.firebaseio.com",
  projectId: "crav-eat-full-stack",
  storageBucket: "crav-eat-full-stack.appspot.com",
  messagingSenderId: "330576647671",
  appId: "1:330576647671:web:d714499252561e55618af2",
  measurementId: "G-54HGMSRHYF"
};

firebase.initializeApp(config)

const db = firebase.firestore()


export default db;