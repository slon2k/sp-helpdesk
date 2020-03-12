import * as React from "react";
import User from "../user";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import styles from "./AppHeader.module.scss";

const AppHeader = () => {
  return (
    <div className={styles.appHeader}>
      <div>
      <Link to="/">Home</Link>
      <span> | </span>
      <Link to="/create">New</Link>        
      </div>
      <User />
    </div>
  );
};

export default observer(AppHeader);
