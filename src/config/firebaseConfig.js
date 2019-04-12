import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCryp8pHGqeYKV10TB9ldlpnBr9pBiXR6c",
    authDomain: "git-dashboard-3b3fb.firebaseapp.com",
    databaseURL: "https://git-dashboard-3b3fb.firebaseio.com",
    projectId: "git-dashboard-3b3fb",
    storageBucket: "git-dashboard-3b3fb.appspot.com",
    messagingSenderId: "460504408121"
};

firebase.initializeApp(config);

export default firebase;