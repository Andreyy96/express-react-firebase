import {useEffect} from "react";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useParams} from "react-router-dom";
import {messageActions} from "../../../store/slices/messageSlice";
import {Message} from "../Message/Message";
import css from "./Messages.module.css"



const Messages = () => {

    const {messages, trigger} = useAppSelector(state => state.message)
    const dispatch = useAppDispatch()
    const {chatId} = useParams<string>()



    useEffect(() => {
        dispatch(messageActions.getAllChatMessages({chatId}))
    }, [chatId, dispatch, trigger]);



    return (
        <div className={css.messages}>
            {messages.map((message, index) => <Message message={message} key={index}/>)}
        </div>
    );
};

export {Messages}