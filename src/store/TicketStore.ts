import { RootStore } from "./RootStore";

export default class TicketStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
}
