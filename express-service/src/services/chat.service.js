const {firestore, storage} = require('../firebase-storage/firebase-storage');
const {collection, doc, setDoc, getDoc, updateDoc, deleteDoc, query, where, getDocs} = require("firebase/firestore")
const {ref, uploadBytesResumable} = require("firebase/storage")
const ApiError = require("../errors/api-error");
const {userService} = require("./user.service");
const {firestoreService} = require("./firestore.service");
const {storageService} = require("./storage.service");

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');


class ChatService {

    // async createChat(userName) {
    //     const currentUser = JSON.parse(localStorage.getItem('UID'))
    //     const user = await userService.findByName(userName)
    //
    //     await this.isChatExist(currentUser.uid, user[0].uid)
    //
    //     return await firestoreService.addChatToCollection(currentUser.uid, user[0].uid)
    // }

    async createChat(userName) {
        const currentUser = JSON.parse(localStorage.getItem('UID'))
        const user = await userService.findByName(userName)

        await this.isChatExist(currentUser, user)

        return await firestoreService.addChatToCollection(currentUser, user)
    }

    async getChats() {
        const currentUser = JSON.parse(localStorage.getItem('UID'))

        return await firestoreService.getCurrentUserChats(currentUser)
    }

    async getAllChatMessages(chatId){
        return await firestoreService.getAllDocumentsCollectionByUsersId(chatId)
    }


    async sendMessage(files, text, chatId) {

        const user = JSON.parse(localStorage.getItem('UID'))

        if(!user) {
            throw ApiError("unauthorized", 401)
        }


        await this.isUserChatParticipant(chatId, user)


        return await firestoreService.addMessageToCollection(files, text, chatId, user)

    }

    async updateMessage(chatId, messageId, text) {
        const user = JSON.parse(localStorage.getItem('UID'))

        if(!user) {
            throw ApiError("unauthorized", 401)
        }

        await this.isUserChatParticipant(chatId, user)

        return await firestoreService.updateMessageById(messageId, user, text)
    }

    async deleteMessage(chatId, messageId) {
        const user = JSON.parse(localStorage.getItem('UID'))

        if(!user) {
            throw ApiError("unauthorized", 401)
        }

        await this.isUserChatParticipant(chatId, user)

        await firestoreService.deleteDocument("messages", messageId, user)
    }

    async isUserChatParticipant(chatId, user) {
        console.log(chatId, user)
        const chats = await collection(firestore, 'chats')
        const chat = doc(chats, chatId)

        // const isExist = (await getDoc(chat)).data().participantIDs.includes(user.uid)
        const document = (await getDoc(chat)).data()

        const isExist =document.participants.some(participant => participant.uid === user.uid)
        console.log(isExist)

        if(!isExist){
            throw new ApiError("forbidden", 403)
        }
    }

    // async isChatExist(currentUserUid, userUid) {
    //     const data = query(
    //         collection(firestore, 'chats'),
    //         where('participantIDs', 'array-contains', currentUserUid || userUid)
    //     )
    //
    //     const documentData = await getDocs(data).then(docData =>{
    //         console.log(docData.docs.map(doc => doc.data()))
    //         return docData.docs.map(doc => doc.data())
    //     })
    //
    //     console.log(documentData)
    //
    //     if(documentData.length >= 1) {
    //         throw new ApiError("conflict", 409)
    //     }
    // }

    async isChatExist(currentUser, user) {
        const data = query(
            collection(firestore, 'chats'),
            where('participants', 'array-contains', {uid: currentUser.uid, name: currentUser.displayName}),
        )

        const documentsData = await getDocs(data).then(docData => {
            return docData.docs.map(doc => doc.data())
        })


        const isChatCreated = documentsData.some(documentData => documentData.participants.find(participant => participant.uid === user[0].uid))


        console.log(isChatCreated)
        if (isChatCreated) {
            throw new ApiError("conflict", 409)
        }
    }
}

module.exports = {
    chatService: new ChatService()
}