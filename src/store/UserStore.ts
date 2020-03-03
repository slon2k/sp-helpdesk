import { RootStore } from "./RootStore";
import { IUser } from "@src/models/IUser";
import { observable, action, runInAction } from "mobx";
import api from "@src/services/api";
import { map } from "@src/models/Mappings";

export default class UserStore {
  private rootStore: RootStore;

  @action init = () => {
    this.user = undefined;
    this.loadingUser = false;
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.init();
  }

  @observable user: IUser;
  @observable loadingUser: boolean;

  @action setUser = (user: IUser) => (this.user = user);

  @action setLoadingUser = (value: boolean) => (this.loadingUser = value);

  @action loadUser = async () => {
    this.setLoadingUser(true);
    try {
      const res = await api.GetCurrentUser();
      const user = map.user(res);
      runInAction(() => {
        this.setLoadingUser(false);
        this.setUser(user);
        console.log("user:", this.user);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => this.setLoadingUser(false));
    }
  };
}
