import { IUser } from "./IUser";

export interface ITicket {
  Id: number;
  Title: string;
  Created: Date;
  Author: IUser;
  Modified: Date;
  Editor: IUser;
  Status: string;
}
