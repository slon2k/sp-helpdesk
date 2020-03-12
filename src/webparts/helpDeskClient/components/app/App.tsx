import * as React from "react";
import { IAppProps } from "./IAppProps";
import ApiService from "@src/services/api";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import AppHeader from "../app-header";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage, CreatePage, DetailsPage } from "../../pages";
import styles from "../../styles/style.module.scss";

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
      <div className={styles.helpDeskClient}>
        <div className={styles.container}>
          <AppHeader />
          <Switch>
            <Route path="/create" exact>
              <CreatePage />
            </Route>
            <Route path="/ticket/:id" exact component={DetailsPage}></Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default observer(App);
