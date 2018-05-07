import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyD-nvIt26oBG8vYgzHzXyLAyd9E8YN-6g4",
    authDomain: "little-weeds-746c6.firebaseapp.com",
    databaseURL: "https://little-weeds-746c6.firebaseio.com",
    projectId: "little-weeds-746c6",
    storageBucket: "little-weeds-746c6.appspot.com",
    messagingSenderId: "701410416995"
  };
var fire = firebase.initializeApp(config);
export default fire;
