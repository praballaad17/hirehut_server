// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9pQqEAJ5BIF-JBLnYfG_Vxp39igz8aqw",
  authDomain: "hirehut-34c7d.firebaseapp.com",
  projectId: "hirehut-34c7d",
  storageBucket: "hirehut-34c7d.appspot.com",
  messagingSenderId: "318064471838",
  appId: "1:318064471838:web:09ef30ca059d7859e4630f",
  measurementId: "G-8HWDHPHLYG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage;

const analytics = getAnalytics(app);
