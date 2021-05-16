import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAV0lUV8ZiaQUqpUX1qiwNmwhsxquJ5bF8",
    authDomain: "movie-reviews-cebc7.firebaseapp.com",
    projectId: "movie-reviews-cebc7",
    storageBucket: "movie-reviews-cebc7.appspot.com",
    messagingSenderId: "218242323121",
    appId: "1:218242323121:web:e30c672718909532db4890"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;