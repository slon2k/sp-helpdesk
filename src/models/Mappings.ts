import { IUser } from "./IUser";
import { ITicket } from "./ITicket";
import { IVersion } from "./IVersion";

export const map = {
  user: (item: any): IUser => {
    const { Id, Title } = item;
    const user: IUser = {
      Id: parseInt(Id),
      Title
    };
    return user;
  },
  ticketWithAuthor: (item: any): ITicket => {
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
  },
  ticket: (item: any) : ITicket => {
    const {
      Id,
      Title,
      Created,
      Modified,
      Status
    } = item;

    const ticket: ITicket = {
      Id,
      Title,
      Created,
      Status,
      Modified,
      Author: undefined,
      Editor: undefined
    };
    return ticket;
  },
  ticketFromVersion: (item: any) => {
    const {
      ID,
      Title,
      Created,
      Modified,
      Status,
      Author: { LookupId: AuthorId, LookupValue: AuthorTitle },
      Editor: { LookupId: EditorId, LookupValue: EditorTitle }
    } = item;
    const ticket: ITicket = {
      Id: ID,
      Title,
      Created,
      Status,
      Modified,
      Author: { Id: AuthorId, Title: AuthorTitle },
      Editor: { Id: EditorId, Title: EditorTitle}
    };
    console.log("map to ticket", ticket);
    return ticket;    
  }, 
  versions: (items: any[]) => {
    console.log("mapping start", items);
    const versions: IVersion[] = [];
    let previousStatus: string = "";
    for (let index = items.length - 1; index >= 0; index--) {
      const item = items[index];
      const { VersionId, Modified, Editor: { LookupId: EditorId, LookupValue: EditorTitle }, Status, Comments } = item;
      const version: IVersion = {
        VersionId, 
        Modified, 
        Editor: { Id: EditorId, Title: EditorTitle }, 
        Status,
        StatusChanging: Status !== previousStatus, 
        Comments
      };
      versions.push(version);
      previousStatus = Status;      
    }
    console.log("mapping to versions", versions);
    return versions;
  }
};
