import * as React from "react";
import User from "@src/components/user";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, withRouter, NavLink } from "react-router-dom";
import styles from "./AppHeader.module.scss";
import { CommandBarButton, IIconProps } from "office-ui-fabric-react";

const AppHeader: React.FC<RouteComponentProps> = ({ location }) => {
  const addIcon: IIconProps = { iconName: "Add" };
  const homeIcon: IIconProps = { iconName: "Home" };
  return (
    <div className={styles.appHeader}>
      <div className={styles.headerContainer}>
        <div className={styles.links}>
          <NavLink exact={true} to="/" className={styles.link}>
            <CommandBarButton iconProps={homeIcon} text="Ticket list" />
          </NavLink>
          <NavLink exact={true} to="/create">
            <CommandBarButton iconProps={addIcon} text="New item" />
          </NavLink>
        </div>
        <div className={styles.user}>
          <User />
        </div>
      </div>
    </div>
  );
};

export default withRouter(observer(AppHeader));
