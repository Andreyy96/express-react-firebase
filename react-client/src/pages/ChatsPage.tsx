import { Outlet } from "react-router-dom";
import { Chats } from "../components/Chats-Container/Chats/Chats";
import css from "./ChatsPage.module.css"


const ChatsPage = () => {
    return (
        <div className={css.page}>
            <Chats/>
            <Outlet/>
        </div>
    );
};

export {ChatsPage}