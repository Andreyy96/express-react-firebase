const {firestore} = require('../firebase-storage/firebase-storage');
const {collection, doc, setDoc, getDoc, updateDoc, deleteDoc,
    query, where, getDocs, orderBy} = require("firebase/firestore")
const ApiError = require("../errors/api-error");
const {storageService} = require("./storage.service");



class FirestoreService {
   async addUserToCollection(cred, dto) {
       const collect = collection(firestore, 'users')
       const document = doc(collect, cred.user.uid)
       await setDoc(document, {uid: cred.user.uid, name: dto.name})
       return (await getDoc(document)).data()
    }

    // async addChatToCollection(currentUserUid, userUid) {
    //     const collect = collection(firestore, 'chats')
    //     const document = doc(collect)
    //     await setDoc(document, {
    //         id: document.id,
    //         participantIDs: [currentUserUid, userUid],
    //     })
    //     return (await getDoc(document)).data()
    // }

    async addChatToCollection(currentUser, user) {
        const collect = collection(firestore, 'chats')
        const document = doc(collect)
        await setDoc(document, {
            id: document.id,
            participants: [
                {uid: currentUser.uid, name: currentUser.displayName},
                {uid: user[0].uid, name: user[0].name}
            ]
        })
        return (await getDoc(document)).data()
    }

    async addMessageToCollection(files, text, chatId, user) {
       console.log("message")
        const collect = collection(firestore, 'messages')
        const document = doc(collect)
        await setDoc(document, {
            messageId: document.id,
            text,
            chatId,
            userId: user.uid,
            createdAt: new Date()
        })

        const data = (await getDoc(document)).data()

        if(files) {
            await storageService.uploadFiles(document, files, data, user)
        }
        else {
            await setDoc(document, {...data,
                files: []
            })
        }

        return data
    }

    async getCurrentUserChats(user) {
        const data = query(
            collection(firestore, 'chats'),
            where('participants', 'array-contains', { uid: user.uid, name: user.displayName })
        )
        const documentData = await getDocs(data)

        return documentData.docs.map(doc => doc.data())
    }

    async getDocumentById(collectionName, id) {
        const collect = collection(firestore, collectionName)
        const document = await  doc(collect ,id)
        const data = await getDoc(document)


        return data.data()
    }

    async getAllDocumentsCollectionByUsersId(chatId) {
       const chatData= await this.getDocumentById("chats", chatId)

        let messages = []

        for (const participant of chatData.participants) {
            const data = await query(
                collection(firestore, "messages"),
                where("chatId", "==", chatId),
                where("userId", "==", participant.uid),
            )
            const docs = await getDocs(data)
            docs.docs.map(doc => messages.push(doc.data()))
        }

        return messages.sort((a, b) => a.createdAt - b.createdAt)
    }

    async getUsersByName(username) {
        const data = query(
            collection(firestore, 'users'),
            where('name', '==', username)
        )
        const documentData = await getDocs(data)

        if (documentData.docs.length <= 0) {
            throw new ApiError('user not found', 404)
        }

        return documentData.docs.map(doc => doc.data())
    }

    async updateMessageById(messageId, user, text) {
        const collect = collection(firestore, 'messages')
        const document = doc(collect, messageId)
        const data = (await getDoc(document)).data()

        if(data.userId !== user.uid) {
            throw new ApiError("forbidden", 403)
        }

        await updateDoc(document, {
            text
        })
        return data
    }

    async deleteDocument(collectionName, id, user) {
        const collect = collection(firestore, collectionName)
        const document = doc(collect, id)
        const data = await getDoc(document).then(ref => ref.data())

        if(data.userId !== user.uid) {
            throw new ApiError("forbidden", 403)
        }

        await deleteDoc(document)
    }
}

module.exports = {
    firestoreService: new FirestoreService()
}