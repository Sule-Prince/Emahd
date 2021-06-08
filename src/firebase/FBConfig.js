import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDErGqFOme5z_zxxIMnsTYY845k1u8JlU8",
  authDomain: "emahd-fdd9d.firebaseapp.com",
  databaseURL: "https://emahd-fdd9d.firebaseio.com",
  projectId: "emahd-fdd9d",
  storageBucket: "emahd-fdd9d.appspot.com",
  messagingSenderId: "366726539295",
  appId: "1:366726539295:web:af52d6f1fc58a9010a0d2a",
  measurementId: "G-8NK737YSQE",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase
  .firestore()
  .enablePersistence()
  .then(() => {
    console.log("Persistence enabled");
  })
  .catch((err) => {
    console.log(err.code);
  });
export const projectStorage = firebase.storage();
export const projectFirestore = firebase.firestore();
export const projectAuth = firebase.auth();
