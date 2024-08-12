import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces";
import {AxiosError} from "axios";

import {userService} from "../../services/userService";

interface IState {
    user: IUser;
}

const initialState: IState = {
    user: null
}

const getById = createAsyncThunk<IUser, {id: string }>(
    "userSlice/getById",
    async ({id}, thunkAPI) => {
        try {
           const {data} = await userService.getById(id)
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getById.fulfilled, (state, action) => {
            state.user = action.payload
        })
})

const {reducer: userReducer, actions} = userSlice

const userActions = {
    ...actions,
    getById,

}

export {
    userReducer,
    userActions
}