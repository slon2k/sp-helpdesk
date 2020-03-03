import * as React from "react";
import { IAppProps } from "./IAppProps";
import ApiService from "@src/services/api";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import User from "../user";

const App: React.FC<IAppProps> = ({ listTitle }) => {
  const Store = React.useContext(StoreContext);
  const { loadUser } = Store.userStore;

  return (
    <div>
      <h1>App!</h1>
      <h2>title: {listTitle}</h2>
      <button onClick={() => ApiService.GetCurrentUser().then(console.log)}>
        get user
      </button>
      <button onClick={() => ApiService.GetTickets().then(console.log)}>
        get tickets
      </button>
      <button onClick={loadUser}>
        store: get user
      </button>
      <User />
    </div>
  );
};

export default observer(App);
