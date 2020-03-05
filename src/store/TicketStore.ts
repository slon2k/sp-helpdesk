import { RootStore } from "./RootStore";
import { observable, reaction, action, runInAction, computed } from "mobx";
import { ITicket } from "@src/models/ITicket";
import api from "@src/services/api";
import { map } from "@src/models/Mappings";
import { IVersion } from "@src/models/IVersion";

export default class TicketStore {
  private rootStore: RootStore;

  @action init = () => {
    this.tickets = new Map<number, ITicket>();
    this.ticket = undefined;
    this.versions = [];
    this.loadingTickets = false;
    this.loadingTicket = false;
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.init();
  }

  @observable tickets: Map<number, ITicket>;
  @observable ticket: ITicket;
  @observable versions: IVersion[];
  @observable loadingTickets: boolean;
  @observable loadingTicket: boolean;
  
  @computed get ticketsToList(): ITicket[] {
    const tickets: ITicket[] = [];
    this.tickets.forEach(item => tickets.push(item));
    return tickets;
  }

  @action setTicket = (ticket: ITicket) => (this.ticket = ticket);

  @action setLoadingTickets = (value: boolean) => (this.loadingTickets = value);
  
  @action setLoadingTicket = (value: boolean) => (this.loadingTicket = value);

  @action setVersions = (versions: IVersion[]) => (this.versions = versions);
  
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
    console.log("loading tickets");
    try {
      const tickets = await api.GetTickets();
      runInAction(() => {
        tickets.forEach((item: any) => {
          const ticket = map.ticket(item);
          this.tickets.set(ticket.Id, ticket);
        });
        this.setLoadingTickets(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => this.setLoadingTickets(false));
    }
  };

  @action loadTicket = async (id: number) => {
    this.setLoadingTicket(true);
    console.log("loading ticket");
    try {
      const ticket = await api.GetTicket(id);
      const { versions } = ticket;
      runInAction(() => {
        this.setTicket(map.ticket(ticket));
        this.setVersions(map.versions(versions));
        this.setLoadingTicket(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => this.setLoadingTicket(false));
    }
  }
}
