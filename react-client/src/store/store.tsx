import {configureStore} from "@reduxjs/toolkit";

import {authReducer} from "./slices/authSlice";
import {chatReducer} from "./slices/chatSlice";
import {userReducer} from "./slices/userSlice";
import {messageReducer} from "./slices/messageSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        user: userReducer,
        message: messageReducer,
    }
})

export {store}