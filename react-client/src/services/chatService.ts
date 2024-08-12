import {apiService} from "./apiService";
import {urls} from "../constants/urls";
import {IRes} from "../types/responesType";
import {IChat} from "../interfaces";
import {IMessage} from "../interfaces/messageInterface";

const chatService = {
    getAll: ():IRes<IChat[]> => apiService.get(urls.chats.link),
    create: (name: string):IRes<void> => apiService.post(urls.chats.link, {name}),
    sendMessage: (chatId: string, data: FormData):IRes<void> =>  apiService.post(urls.chats.byId(chatId), data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }),
    getAllMessage: (chatId: string):IRes<IMessage[]> => apiService.get(urls.chats.byId(chatId)),
    updateMessage: (chatId: string, messageId: string, message: IMessage): IRes<void> => apiService.put(urls.chats.byIds(chatId, messageId), message),
    deleteMessage: (chatId: string, messageId: string): IRes<void> => apiService.delete(urls.chats.byIds(chatId, messageId)),
}

export {chatService}