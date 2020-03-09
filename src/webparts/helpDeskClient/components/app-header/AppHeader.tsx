import * as React from "react";
import User from "../user";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Filter from "../filter";

const AppHeader = () => {
  return (
    <div>
      <User />
      <Link to="/">Home</Link>
      <span> | </span>
      <Link to="/create">New</Link>
      <Filter />
    </div>
  );
};

export default observer(AppHeader);
