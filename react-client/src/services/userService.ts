import { IRes } from "../types/responesType";
import {apiService} from "./apiService";
import {urls} from "../constants/urls";
import {IUser} from "../interfaces";



const userService = {
    getById: (id: string): IRes<IUser> => apiService.get(urls.users.byId(id))

}

export {
    userService
}