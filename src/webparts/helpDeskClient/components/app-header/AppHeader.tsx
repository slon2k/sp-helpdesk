import * as React from "react";
import User from "../user";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <div>
      <User />
      <Link to="/">Home</Link>
      <span> | </span>
      <Link to="/create">New</Link>
      <span> | </span>
      <Link to="/ticket/3">Ticket 3</Link>
    </div>
  );
};

export default observer(AppHeader);
