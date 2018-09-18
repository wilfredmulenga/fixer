//firebase configuration
const firebase = require('firebase/app')
require('firebase/auth');
require('firebase/database');
require('firebase/storage');


var config = {
  apiKey: "AIzaSyCQQOqoAv9gfqTqtpXgLVEFO-0MFb7MFDw",
  authDomain: "fixer-test.firebaseapp.com",
  databaseURL: "https://fixer-test.firebaseio.com",
  projectId: "fixer-test",
  storageBucket: "fixer-test.appspot.com",
  messagingSenderId: "539870130177"
};
firebase.initializeApp(config);
var Firebase = firebase;

export default Firebase;