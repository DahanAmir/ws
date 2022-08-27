const firebase = require("firebase/app");
 require("firebase/firebase-firestore");


const firebaseConfig = {
  apiKey: "AIzaSyD6w6VWkyr4ZPm8EJeDMu60YHvz_h5iJ-M",
  authDomain: "fs2022-4eb5f.firebaseapp.com",
  projectId: "fs2022-4eb5f",
  storageBucket: "fs2022-4eb5f.appspot.com",
  messagingSenderId: "866124635693",
  appId: "1:866124635693:web:fefdc33359e64163e0e2a4",
};
firebase.initializeApp(firebaseConfig);


module.exports = {  
  firebase
};
