import { IUser } from "./IUser";

export interface IComment {
  Id: number;
  Modified: Date;
  Author: IUser;
  Body: string;
}
