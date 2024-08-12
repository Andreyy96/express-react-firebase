import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../../interfaces";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {authActions} from "../../store/slices/authSlice";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const {register, handleSubmit} = useForm<IAuth>();
    const dispatch = useAppDispatch()
    const {loginError} = useAppSelector(state => state.auth)
    const navigate = useNavigate()

    const login:SubmitHandler<IAuth> = async (user) => {
        const { meta: {requestStatus}} = await dispatch(authActions.login({user}))
        if (requestStatus==='fulfilled'){
            navigate('/chats')
        }
    }

    return (
        <div>
            {loginError && <h4>{loginError}</h4>}
            <form onSubmit={handleSubmit(login)}>
                <input type="text" placeholder={'email'} {...register('email')}/>
                <input type="text" placeholder={'password'} {...register('password')}/>
                <button>login</button>
            </form>
        </div>
    );
};

export {Login};