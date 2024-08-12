import { IRes } from "../types/responesType";
import {apiService} from "./apiService";
import {urls} from "../constants/urls";
import {IAuth, ILoginResInterface, IRegisterResInterface} from "../interfaces";



const authService = {
    register(user: IAuth): IRes<IRegisterResInterface> {
        return apiService.post(urls.auth.register, user)
    },

    async login(user: IAuth): Promise<ILoginResInterface> {
        const {data} = await apiService.post(urls.auth.login, user);
        return data
    },

     async signOut(): Promise<void> {
        await apiService.delete(urls.auth.signOut);
    }
}

export {
    authService
}