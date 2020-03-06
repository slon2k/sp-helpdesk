import * as React from "react";
import { IAppProps } from "./IAppProps";
import ApiService from "@src/services/api";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import User from "../user";
import Tickets from "../tickets";
import { map } from "@src/models/Mappings";

const App: React.FC<IAppProps> = ({ listTitle }) => {
  const Store = React.useContext(StoreContext);
  const { loadUser } = Store.userStore;
  const { loadTickets } = Store.ticketStore;

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
        store: get user from sp
      </button>
      <button onClick={loadTickets}>
        store: get tickets
      </button>      
      <button onClick={() => ApiService.GetTicket(2).then(v => map.versions(v.Versions)).then(console.log)}>
        store: get ticket
      </button>
      <button >get versions</button>
      <User />
      <Tickets />
    </div>
  );
};

export default observer(App);
