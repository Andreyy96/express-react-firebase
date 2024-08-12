const {initializeApp} = require('firebase/app');
const {getAuth} = require('firebase/auth');
const {getFirestore} = require('firebase/firestore');
const {getStorage} = require('firebase/storage');


const config = require('../configs/config');

const firebaseConfig = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
}
const db = initializeApp(firebaseConfig)
const auth = getAuth()
const firestore = getFirestore()
const storage = getStorage(db)




module.exports = {db, auth, firestore, storage}


