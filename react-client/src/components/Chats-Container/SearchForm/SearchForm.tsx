import {InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {SubmitHandler, useForm} from "react-hook-form";

import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {chatActions} from "../../../store/slices/chatSlice";
import css from "./SearchForm.module.css"

const SearchForm = () => {

    const {register, handleSubmit, reset} = useForm<{word: string}>()
    const dispatch = useAppDispatch()


    const createByName: SubmitHandler<{word: string}> = (query) => {
        dispatch(chatActions.postChat({name: query.word}))
        reset()
    }

    return (
        <div className={css.search_div}>
            <form onSubmit={handleSubmit(createByName)}>
                <InputBase
                    size={"small"}
                    type={"text"}
                    id="outlined-textarea"
                    placeholder="Find user"
                    required
                    {...register("word")}
                />
                <button><SearchIcon/></button>
            </form>
        </div>
    );
};

export {SearchForm}