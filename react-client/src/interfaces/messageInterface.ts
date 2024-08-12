export interface IMessage {
    chatId: string
    createdAt: Date
    messageId: string,
    files: {name: string, url: string}[]
    text: string
    userId: string
}