import {Link, useNavigate} from "react-router-dom";

import css from "./Header.module.css"
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {authActions} from "../../store/slices/authSlice";


const Header = () => {

    const {currentUser} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const signOut = () => {
        dispatch(authActions.signOut())
        navigate("/login")
    }

    return (
        <div className={css.Header}>
            <div>
                <h1>Chats</h1>
            </div>
            {currentUser ?
                <div>
                    <h3>{currentUser.providerData[0].displayName} - {currentUser.lastLoginAt}</h3>
                    <button onClick={signOut}>SignOut</button>
                </div>
                :
            <div className={css.tools}>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>
            </div>
            }
        </div>
    );
};

export {Header}