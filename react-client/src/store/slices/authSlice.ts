import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {IAuth, ILoginResInterface} from "../../interfaces";
import {AxiosError} from "axios";
import {authService} from "../../services";

interface IState {
    registerError: string
    loginError: string
    currentUser: ILoginResInterface
}

const initialState: IState = {
    registerError: null,
    loginError: null,
    currentUser: null
}

const register = createAsyncThunk<void, { user : IAuth }>(
    "authSlice/register",
    async ({user}, thunkAPI) => {
        try {
            await authService.register(user)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const login = createAsyncThunk<ILoginResInterface, { user : IAuth }>(
    "authSlice/login",
    async ({user}, thunkAPI) => {
        try {
            return  await authService.login(user)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const signOut = createAsyncThunk<void, void>(
    "authSlice/signOut",
    async (_, thunkAPI) => {
        try {
            await authService.signOut()
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(register.rejected, state => {
            state.registerError = "Email already exist"
        })
        .addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        .addCase(signOut.fulfilled, state => {
            state.currentUser = null
        })
        .addCase(login.rejected, state => {
            state.loginError = "Wrong email or password"
        })
        .addMatcher(isFulfilled(register, login), state => {
            state.registerError = null
            state.loginError = null
        })
})

const {reducer: authReducer, actions} = authSlice

const authActions = {
    ...actions,
    register,
    login,
    signOut
}

export {
    authReducer,
    authActions
}