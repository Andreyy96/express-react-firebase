import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {chatService} from "../../services/chatService";
import {IMessage} from "../../interfaces/messageInterface";

interface IState {
    messages: IMessage[],
    trigger: boolean,
    messageForUpdate: IMessage
}

const initialState: IState = {
    messages: [],
    trigger: false,
    messageForUpdate: null
}


const getAllChatMessages = createAsyncThunk<IMessage[], { chatId: string }>(
    "messageSlice/getAllChatMessages",
    async ({chatId}, thunkAPI) => {
        try {
            const {data} = await chatService.getAllMessage(chatId)
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const sendMessage = createAsyncThunk<void, { chatId: string, data: FormData }>(
    "messageSlice/sendMessage",
    async ({chatId, data}, thunkAPI) => {
        try {
            await chatService.sendMessage(chatId, data)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const updateMessage = createAsyncThunk<void, { chatId: string, messageId: string, message: IMessage }>(
    "messageSlice/updateMessage",
    async ({chatId, messageId, message}, thunkAPI) => {
        try {
             await chatService.updateMessage(chatId, messageId, message)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const deleteMessage = createAsyncThunk<void, { chatId: string, messageId: string }>(
    "messageSlice/deleteMessage",
    async ({chatId, messageId}, thunkAPI) => {
        try {
            await chatService.deleteMessage(chatId, messageId)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers: {
        setMessageForUpdate: (state, action) => {
            state.messageForUpdate = action.payload
}
    },
    extraReducers: builder => builder
        .addCase(getAllChatMessages.fulfilled, (state, action) => {
            state.messages = action.payload
        })
        .addCase(updateMessage.fulfilled, (state, action) => {
            state.messageForUpdate = null
        })
        .addMatcher(isFulfilled(sendMessage, updateMessage, deleteMessage), state => {
            state.trigger = !state.trigger
        })
})

const {reducer: messageReducer, actions} = messageSlice

const messageActions = {
    ...actions,
    getAllChatMessages,
    sendMessage,
    updateMessage,
    deleteMessage
}

export {
    messageReducer,
    messageActions
}