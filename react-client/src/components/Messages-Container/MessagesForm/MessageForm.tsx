import {SubmitHandler, useForm} from "react-hook-form";

import {useParams} from "react-router-dom";
import {useAppDispatch,  } from "../../../hooks/useAppDispatch";
import {messageActions} from "../../../store/slices/messageSlice";
import {useEffect} from "react";
import {useAppSelector} from "../../../hooks/useAppSelector";



const MessageForm = () => {
    const {register, handleSubmit, reset, setValue} = useForm<{ files: FileList, text: string }>();
    const dispatch = useAppDispatch()
    const {chatId} = useParams<string>()
    const {messageForUpdate} = useAppSelector(state => state.message)


    useEffect(() => {
        if (messageForUpdate) {
            setValue("text", messageForUpdate.text)
        }
    }, [messageForUpdate, dispatch, setValue]);

    const  sendMessage: SubmitHandler<{ files: FileList, text: string }> = async (query) => {
        const data = new FormData();
        if (query.files.length > 0) {
            for (let i = 0; i < query.files.length; i++) {
                const file = query.files[i];
                data.append("file", file);
            }
        }
        data.append("text", query.text);
        await dispatch(messageActions.sendMessage({chatId, data}))
    }

    const updateMessage : SubmitHandler<{ text: string }> = (newTextMessage) => {
        dispatch(messageActions.updateMessage(
            {chatId: messageForUpdate.chatId, messageId: messageForUpdate.messageId, message: {...messageForUpdate, text: newTextMessage.text}}))
        reset()
    }

    return (
        <div>
            {messageForUpdate ?
                <form onSubmit={handleSubmit(updateMessage)}>
                    <input type="text" placeholder={'text'} {...register('text')}/>
                    <button>update</button>
                </form>
                :
                <form onSubmit={handleSubmit(sendMessage)}>
                    <input type="text" placeholder={'text'} {...register('text')}/>
                    <input type="file" placeholder={'files'} {...register('files')}
                           accept="image/*"
                           multiple
                    />
                    <button>save</button>
                </form>
            }
        </div>
    );
};

export {MessageForm};