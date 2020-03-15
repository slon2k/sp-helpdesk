import * as React from "react";
import { IAppProps } from "./IAppProps";
import StoreContext from "@src/store";
import ApiService from "@src/services/api";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import styles from "@src/styles/style.module.scss";
import { observer } from "mobx-react-lite";
import AppHeader from "../app-header";

const App: React.FC<IAppProps> = ({ listTitle }) => {
  const Store = React.useContext(StoreContext);
  const { loadUser } = Store.userStore;
  const { loadTickets } = Store.ticketStore;
  const { setAppLoaded, isLoadingApp } = Store.applicationStore;

  React.useEffect(() => {
    ApiService.Init(listTitle);
    if (listTitle !== "") {
      loadUser()
        .then(loadTickets)
        .then(setAppLoaded);
    }
  }, [listTitle, loadUser, loadTickets, setAppLoaded]);

  if (listTitle === "") {
    return <div>Application is not configured</div>;
  }

  if (isLoadingApp) {
    return <div>Loading data...</div>;
  }

  return (
    <Router>
      <div className={styles.helpDesk}>
        <AppHeader />
        <div className={styles.container}>
          <h2>Manager App</h2>
        </div>
      </div>
    </Router>
  );
};

export default observer(App);
