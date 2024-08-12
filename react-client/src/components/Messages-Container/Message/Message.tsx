import {FC} from 'react';

import {IMessage} from "../../../interfaces/messageInterface";
import {MessageFile} from "../MessageFile/MessageFile";
import {useAppSelector} from "../../../hooks/useAppSelector";
import css from "./Message.module.css"
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {messageActions} from "../../../store/slices/messageSlice";

interface IProps {
    message: IMessage

}
const Message:FC<IProps> = ({message}) => {

    const {currentUser} = useAppSelector(state => state.auth)
    const { text, userId, files} = message
    const style = userId === currentUser.uid ? css.messageCurrentUserDiv : css.messageUserDiv
    const dispatch = useAppDispatch()


    return (
        <div className={style}>
            <div>
                <p>{userId}</p>
            </div>
            <div>
                <p>{text}</p>
            </div>
            <div>
                {files.length >= 1 && files.map((file, index) => <MessageFile file={file} key={index}/>)}
            </div>
            <button onClick={() => dispatch(messageActions.setMessageForUpdate(message))}>update</button>
            <button onClick={() => dispatch(messageActions.deleteMessage({chatId: message.chatId, messageId: message.messageId}))}>delete</button>

        </div>
    );
};

export {Message};
