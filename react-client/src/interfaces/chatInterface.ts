import {IUser} from "./userInterface";

export interface IChat {
    id: string,
    participants: IUser[]
}