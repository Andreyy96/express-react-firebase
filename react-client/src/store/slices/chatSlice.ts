import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {IChat} from "../../interfaces";
import {chatService} from "../../services/chatService";

interface IState {
    chats: IChat[],
    trigger: boolean
}

const initialState: IState = {
    chats: [],
    trigger: false
}


const getAllCurrentUser = createAsyncThunk<IChat[], void>(
    "chatSlice/getAllCurrentUser",
    async (_, thunkAPI) => {
        try {
            const {data} = await chatService.getAll()
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const postChat = createAsyncThunk<void, { name: string }>(
    "chatSlice/postChat",
    async ({name}, thunkAPI) => {
        try {
            await chatService.create(name)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAllCurrentUser.fulfilled, (state, action) => {
            state.chats = action.payload
        })
        .addMatcher(isFulfilled(postChat), state => {
            state.trigger = !state.trigger
        })
})

const {reducer: chatReducer, actions} = chatSlice

const chatActions = {
    ...actions,
    getAllCurrentUser,
    postChat,
}

export {
    chatReducer,
    chatActions
}