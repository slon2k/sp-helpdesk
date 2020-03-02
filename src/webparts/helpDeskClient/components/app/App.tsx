import * as React from "react";
import { IAppProps } from "./IAppProps";
import ApiService from "@src/services/api"

const App: React.FC<IAppProps> = ({listTitle}) => {
  return (
    <div>
      <h1>App!</h1>
      <h2>title: {listTitle}</h2>
      <button onClick = {() => ApiService.GetCurrentUser().then(console.log)}>get user</button>
      <button onClick = {() => ApiService.GetTickets().then(console.log)}>get tickets</button>
    </div>
  );
};

export default App;
