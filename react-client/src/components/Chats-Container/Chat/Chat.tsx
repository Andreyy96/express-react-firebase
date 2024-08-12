import {FC} from 'react';
import {IChat} from "../../../interfaces";

import {ILoginResInterface} from "../../../interfaces";
import {NavLink} from "react-router-dom";

interface IProps {
    chat: IChat
    currentUser: ILoginResInterface
}
const Chat:FC<IProps> = ({chat, currentUser}) => {

    const user = chat.participants.find(chat => chat.uid !== currentUser.uid)


    return (
        <div>
            <NavLink to={`${chat.id}`}>{user.name}</NavLink>
        </div>
    );
};

export {Chat};
