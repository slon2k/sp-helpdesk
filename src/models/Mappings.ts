import { IUser } from "./IUser";
import { ITicket } from "./ITicket";

export const map = {
  user: (item: any): IUser => {
    const { Id, Title } = item;
    const user: IUser = {
      Id: parseInt(Id),
      Title
    };
    return user;
  },
  ticket: (item: any): ITicket => {
    const { Id, Title, Created, Edited, Status, Author, Editor } = item;
    const ticket: ITicket = {
      Id,
      Title,
      Created,
      Status,
      Modified: Edited,
      Author,
      Editor
    };
    return ticket;
  }
};
