import {createBrowserRouter, Navigate} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import {ChatsPage, LoginPage, MessagesPage, RegisterPage} from "./pages";

const router = createBrowserRouter([
    {path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'chats'}/>},
            {path: 'chats', element: <ChatsPage/>, children: [
                    {path: ':chatId', element: <MessagesPage/>}
                ]},
            {path: 'login', element: <LoginPage/>},
            {path: 'register', element: <RegisterPage/>}
        ]}
])

export {
    router
}