const {Router} = require('express');
const {chatController} = require("../controllers/chat.controller");


const router = Router();

router.post(
    "",
    chatController.createChat,
)

router.get(
    "",
    chatController.getChats,
)

router.get(
    "/:chatId",
    chatController.getAllChatMessages,
)

router.post(
    "/:chatId",
    chatController.sendMessage,
)

router.put(
    "/:chatId/:messageId",
    chatController.updateMessage,
)

router.delete(
    "/:chatId/:messageId",
    chatController.deleteMessage,
)

module.exports = {
    chatRouter: router
}