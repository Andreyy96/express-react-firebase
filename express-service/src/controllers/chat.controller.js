const {chatService} = require("../services/chat.service");


class ChatController {

    async createChat(req, res, next) {
        try {
            console.log(req.body)
            const userName = req.body.name;

            const data = await chatService.createChat(userName);
            res.status(201).json(data);
        } catch (e) {
            next(e);
        }
    }

    async getChats(req, res, next) {
        try {
            const data = await chatService.getChats();
            res.status(201).json(data);
        } catch (e) {
            next(e);
        }
    }

    async getAllChatMessages(req, res, next) {
        try {
            const chatId = req.params.chatId
            const data = await chatService.getAllChatMessages(chatId);
            res.status(201).json(data);
        } catch (e) {
            next(e);
        }
    }

    async sendMessage(req, res, next) {
        try {
            const files = req.files?.file
            const text = req.body.text;
            const chatId = req.params.chatId

         await chatService.sendMessage(files, text, chatId);
            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }

    async updateMessage(req, res, next) {
        try {
            const {chatId, messageId} = req.params
            const text = req.body.text;

            const data = await chatService.updateMessage(chatId, messageId, text);
            res.status(201).json(data)
        } catch (e) {
            next(e);
        }
    }

    async deleteMessage(req, res, next) {
        try {
            const {chatId, messageId} = req.params

            await chatService.deleteMessage(chatId, messageId);
            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = {
    chatController: new ChatController()
}