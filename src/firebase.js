import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDl8MVwNVMIgOvOa37GxEqpsANzTaj9Zvo",
    authDomain: "specialist-1f389.firebaseapp.com",
    databaseURL: "https://specialist-1f389.firebaseio.com",
    projectId: "specialist-1f389",
    storageBucket: "specialist-1f389.appspot.com",
    messagingSenderId: "8944858131"
};

export const firebaseApp = firebase.initializeApp(config);
export const listsRef = firebase.database().ref("lists");
export const newListsRef = firebase.database().ref("newLists");
