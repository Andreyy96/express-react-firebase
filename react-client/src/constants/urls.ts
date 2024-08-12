const baseURL = 'http://localhost:3100'

const auth = "/auth"
const chats= "/chats"
const users = "/users"



const urls = {
    auth: {
        login: `${auth}/sign-in`,
        register: `${auth}/sign-up`,
        signOut: `${auth}/sign-out`
    },
    chats: {
        link: chats,
        byId: (chatId: string):string => `${chats}/${chatId}`,
        byIds: (chatId: string, messageId: string):string => `${chats}/${chatId}/${messageId}`
    },
    users: {
        link: users,
        byId: (id:string):string => `${users}/${id}`
    }
}

export {
    baseURL,
    urls
}