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
      Created: new Date(Created),
      Status,
      Modified: new Date(Modified),
      Author: { Id: AuthorId, Title: AuthorTitle },
      Editor
    };
    return ticket;
  },
  ticket: (item: any): ITicket => {
    const { Id, Title, Created, Modified, Status } = item;

    const ticket: ITicket = {
      Id,
      Title,
      Created: new Date(Created),
      Status,
      Modified: new Date(Modified),
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
      Created: new Date(Created),
      Status,
      Modified: new Date(Modified),
      Author: { Id: AuthorId, Title: AuthorTitle },
      Editor: { Id: EditorId, Title: EditorTitle }
    };
    return ticket;
  },
  versions: (items: any[]) => {
    const versions: IVersion[] = [];
    let previousStatus: string = "";
    for (let index = items.length - 1; index >= 0; index--) {
      const item = items[index];
      const {
        VersionId,
        Modified,
        Editor: { LookupId: EditorId, LookupValue: EditorTitle },
        Status,
        Comments
      } = item;
      const version: IVersion = {
        VersionId,
        Modified: new Date(Modified),
        Editor: { Id: EditorId, Title: EditorTitle },
        Status,
        StatusChanging: Status !== previousStatus,
        Comments
      };
      versions.push(version);
      previousStatus = Status;
    }
    return versions;
  }
};
