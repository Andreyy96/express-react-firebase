import {useEffect} from "react";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {chatActions} from "../../../store/slices/chatSlice";
import {Chat} from "../Chat/Chat"
import {useNavigate} from "react-router-dom";
import {SearchForm} from "../SearchForm/SearchForm";
import css from "./Chats.module.css"


const Chats = () => {

    const {chats, trigger} = useAppSelector(state => state.chat)
    const {currentUser} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();


    useEffect(() => {
        if (!currentUser) {
            navigate("/login")
        }
        dispatch(chatActions.getAllCurrentUser())
    }, [currentUser, dispatch, navigate, trigger]);



    return (
        <div className={css.chats}>
            <div>
                <SearchForm/>
            </div>
            <div>
                {chats.length > 0 && chats.map((chat, index) => <Chat chat={chat} currentUser={currentUser} key={index}/>)}
            </div>
        </div>
    );
};

export {Chats}