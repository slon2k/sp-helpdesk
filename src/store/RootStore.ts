import { configure } from "mobx";
import { createContext } from "react";
import TicketStore from "./TicketStore";
import UserStore from "./UserStore";

configure({ enforceActions: "always", isolateGlobalState: true });

export class RootStore {
  public readonly userStore: UserStore;
  public readonly ticketStore: TicketStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.ticketStore = new TicketStore(this);
  }
}

export const StoreContext = createContext(new RootStore());
