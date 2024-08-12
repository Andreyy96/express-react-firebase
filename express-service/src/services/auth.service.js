const {auth} = require('../firebase-storage/firebase-storage');

const {createUserWithEmailAndPassword,
    signInWithEmailAndPassword, updateProfile, } = require("firebase/auth")
const {firestoreService} = require("./firestore.service");
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');


class AuthService {

    async signUp(dto) {
        return await createUserWithEmailAndPassword(auth, dto.email, dto.password)
            .then(async cred => {
                await updateProfile(cred.user, {displayName: dto.name})
                return await firestoreService.addUserToCollection(cred, dto)
            });
    }

    async signIn(dto) {
       await signInWithEmailAndPassword(auth, dto.email, dto.password).then(cred =>
            localStorage.setItem('UID', JSON.stringify(cred.user))
       )

        return JSON.parse(localStorage.getItem('UID'))
    }

    async signOut() {
            localStorage.removeItem('UID')
    }
}

module.exports = {
    authService: new AuthService()
}