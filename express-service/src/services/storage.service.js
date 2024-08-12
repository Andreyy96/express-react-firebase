const {storage} = require('../firebase-storage/firebase-storage');
const {setDoc} = require("firebase/firestore")
const {ref, uploadBytesResumable, getDownloadURL} = require("firebase/storage")




class StorageService {
    async uploadFiles(document, files, data, user) {
        let storageRef
        let files_array = []

        if (Array.isArray(files)) {
            for (const file of files) {
                storageRef = ref(storage, `files/${user.uid}/${file.name}`)
                const reference= await uploadBytesResumable(storageRef, file.data, {contentType: file.mimetype});

                await getDownloadURL(reference.ref).then((url) => {
                    files_array.push({url, name: file.name})

                })
                await setDoc(document, {...data,
                    files: files_array
                })
            }
        } else {
            storageRef = ref(storage, `files/${user.uid}/${data.chatId}/${files.name}`)
            const reference= await uploadBytesResumable(storageRef, files.data, {contentType: files.mimetype});

            await getDownloadURL(reference.ref).then((url) => {
                files_array.push({url, name: files.name})
            })
            await setDoc(document, {...data,
                files: files_array
            })
        }
    }
}

module.exports = {
    storageService: new StorageService()
}