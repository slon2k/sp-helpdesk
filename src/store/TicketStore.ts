import { RootStore } from "./RootStore";
import { observable, reaction, action, runInAction } from "mobx";
import { ITicket } from "@src/models/ITicket";
import api from "@src/services/api";

export default class TicketStore {
  private rootStore: RootStore;

  @action init = () => {
    this.tickets = new Map<number, ITicket>();
    this.ticket = undefined;
    this.loadingTickets = false;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.init();
  }

  @observable tickets: Map<number, ITicket>;
  @observable ticket: ITicket;
  @observable loadingTickets: boolean;

  @action setLoadingTickets = (value: boolean) => (this.loadingTickets = value);

  @action loadTicketsForCurrentUser = async () => {
    const user = this.rootStore.userStore.user;
    if (user) {
      this.setLoadingTickets(true);
      try {
        const res = await api.GetTicketsForAuthor(user.Id);
        console.log(res);
        runInAction(() => this.setLoadingTickets(false));
      } catch (error) {
        console.log(error);
        runInAction(() => this.setLoadingTickets(false));
      }
    }
  };

  @action loadTickets = async () => {
    this.setLoadingTickets(true);
    console.log("loading tickets")
    try {
      const res = await api.GetTickets();
      console.log(res);
      runInAction(() => this.setLoadingTickets(false));
    } catch (error) {
      console.log(error);
      runInAction(() => this.setLoadingTickets(false));
    }
  };
}
