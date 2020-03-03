import { RootStore } from "./RootStore";
import { observable, action } from "mobx";

export default class ApplicationStore {
  private rootStore: RootStore;

  @observable public isLoadingApp: boolean //= true;
  
  @action init = () => {
    this.isLoadingApp = true;
  }

  @action setAppLoaded = () => {
    this.isLoadingApp = false;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.init()
  }
}
