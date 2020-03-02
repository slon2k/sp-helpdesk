import { RootStore } from "./RootStore";

export default class TicketStore {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
}
