import { RootStore } from "./RootStore";
import { observable, reaction, action, runInAction, computed } from "mobx";
import { ITicket } from "@src/models/ITicket";
import api from "@src/services/api";
import { map } from "@src/models/Mappings";
import { IVersion } from "@src/models/IVersion";
import { ITicketCreate } from "@src/models/ITicketCreate";
import { ITicketUpdate } from "@src/models/ITicketUpdate";

export default class TicketStore {
  private rootStore: RootStore;

  @action init = () => {
    this.tickets = new Map<number, ITicket>();
    this.ticket = undefined;
    this.versions = [];
    this.loadingTickets = false;
    this.loadingTicket = false;
    this.statusFilter = "";
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
  @observable statusFilter: string;

  @computed get ticketsToList(): ITicket[] {
    const tickets: ITicket[] = [];
    this.tickets.forEach(item => tickets.push(item));
    return tickets.sort((a, b) => b.Modified.getTime() - a.Modified.getTime());
  }

  @action setTicket = (ticket: ITicket) => (this.ticket = ticket);

  @action addTicket = (ticket: ITicket) => this.tickets.set(ticket.Id, ticket);

  @action setLoadingTickets = (value: boolean) => (this.loadingTickets = value);

  @action setLoadingTicket = (value: boolean) => (this.loadingTicket = value);

  @action setVersions = (versions: IVersion[]) => (this.versions = versions);

  @action setStatusFilter = (value: string) => (this.statusFilter = value);

  @action loadTicketsForCurrentUser = async () => {
    const user = this.rootStore.userStore.user;
    if (user) {
      this.setLoadingTickets(true);
      try {
        const res = await api.GetTicketsForAuthor(user.Id);
        runInAction(() => this.setLoadingTickets(false));
      } catch (error) {
        console.log(error);
        runInAction(() => this.setLoadingTickets(false));
      }
    }
  };

  @action loadTickets = async () => {
    this.setLoadingTickets(true);
    try {
      const tickets = await api.GetTickets();
      runInAction(() => {
        tickets.forEach((item: any) => {
          const ticket = map.ticketWithAuthor(item);
          this.addTicket(ticket);
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
    try {
      const item = await api.GetTicket(id);
      const { Versions } = item;
      runInAction(() => {
        const ticket = map.ticketFromVersion(Versions[0]);
        this.setTicket(ticket);
        this.addTicket(ticket);
        this.setVersions(map.versions(Versions));
        this.setLoadingTicket(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => this.setLoadingTicket(false));
    }
  };

  @action createTicket = async (ticket: ITicketCreate) => {
    this.setLoadingTicket(true);
    try {
      const res = await api.AddTicket(ticket);
      const newTicket = {
        ...map.ticket(res.data),
        Author: this.rootStore.userStore.user
      };
      runInAction(() => this.addTicket(newTicket));
    } catch (error) {
      console.log(error);
      runInAction(() => this.setLoadingTicket(false));
    }
  };

  @action updateTicket = async (ticket: ITicketUpdate) => {
    this.setLoadingTicket(true);
    try {
      const res = await api.UpdateTicket(ticket);
      this.loadTicket(ticket.Id);
      console.log("ticket updated");
    } catch (error) {
      console.log(error);
      runInAction(() => this.setLoadingTicket(false));
    }
  };

  @action deleteTicket = async (id: number) => {
    this.setLoadingTicket(true);
    try {
      const res = await api.DeleteTicket(id);
      runInAction(() => {
        this.tickets.delete(id);
        this.setLoadingTicket(false);
      });
      console.log("ticket deleted");
    } catch (error) {
      console.log(error);
      runInAction(() => this.setLoadingTicket(false));
    }
  };
}
