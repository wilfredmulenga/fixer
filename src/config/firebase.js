//firebase configuration
import firebase from 'firebase';


var config = {
  apiKey: "AIzaSyASmpiQKTf7wbshqrxZiFiWNl9-snFBYFc",
  authDomain: "fixer-2fd6e.firebaseapp.com",
  databaseURL: "https://fixer-2fd6e.firebaseio.com",
  projectId: "fixer-2fd6e",
  storageBucket: "fixer-2fd6e.appspot.com",
  messagingSenderId: "40670467793"
};
firebase.initializeApp(config);
var Firebase = firebase;

export default Firebase;