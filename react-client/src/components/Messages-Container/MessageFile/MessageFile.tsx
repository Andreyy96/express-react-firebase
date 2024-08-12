import {FC} from 'react';
import {NavLink} from "react-router-dom";

import css from "./MessageFile.module.css"

interface IProps {
    file: {name: string, url: string}

}
const MessageFile:FC<IProps> = ({file}) => {

    const {name, url} = file



    return (
        <div className={css.divFile}>
            <NavLink to={url}>
                <img src={url} alt={name}/>
            </NavLink>
        </div>
    );
};

export {MessageFile};