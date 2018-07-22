import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDsInAYyExeynDsRE_cdF11xatIkuj3JUQ",
  authDomain: "goalcoach-bb5cf.firebaseapp.com",
  databaseURL: "https://goalcoach-bb5cf.firebaseio.com",
  projectId: "goalcoach-bb5cf",
  storageBucket: "goalcoach-bb5cf.appspot.com",
  messagingSenderId: "542818990624"
};

export const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref('goals');
export const completeGoalRef = firebase.database().ref('completeGoals');