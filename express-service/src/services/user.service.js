const {firestoreService} = require("./firestore.service");

const {auth} = require('../firebase-storage/firebase-storage');
const {onAuthStateChanged} = require('firebase/auth');

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');


class UserService {

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('UID'))

    }

    async getById(userId) {
        return await firestoreService.getDocumentById("users", userId)
        }

    async findByName(username) {
        return await firestoreService.getUsersByName(username)
    }
}

module.exports = {
    userService: new UserService()
}