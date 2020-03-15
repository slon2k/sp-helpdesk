import * as React from "react";
import Header from "@src/components/header";
import User from "@src/components/user";
import { IIconProps, CommandBarButton } from "office-ui-fabric-react";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  const homeIcon: IIconProps = { iconName: "Home" };
  return (
    <Header>
      <NavLink exact={true} to="/" style={{ alignSelf: "center" }}>
        <CommandBarButton iconProps={homeIcon} text="Ticket list" />
      </NavLink>
      <User />
    </Header>
  );
};

export default AppHeader;
