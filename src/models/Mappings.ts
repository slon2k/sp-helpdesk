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
    const {
      Id,
      Title,
      Created,
      Modified,
      Status,
      Author: { Id: AuthorId, Title: AuthorTitle },
      Editor
    } = item;

    const ticket: ITicket = {
      Id,
      Title,
      Created,
      Status,
      Modified,
      Author: { Id: AuthorId, Title: AuthorTitle },
      Editor
    };
    console.log("map to ticket", ticket);
    return ticket;
  }
};
