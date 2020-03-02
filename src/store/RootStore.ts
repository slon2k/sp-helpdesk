import { configure } from "mobx";
import { createContext } from "react";
import TicketStore from "./TicketStore";
import UserStore from "./UserStore";
import ApplicationStore from "./ApplicationStore";

configure({ enforceActions: "always", isolateGlobalState: true });

export class RootStore {
  public readonly userStore: UserStore;
  public readonly ticketStore: TicketStore;
  public readonly applicationStore: ApplicationStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.ticketStore = new TicketStore(this);
    this.applicationStore = new ApplicationStore(this);
  }
}

export const StoreContext = createContext(new RootStore());
