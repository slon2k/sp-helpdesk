import * as React from "react";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";

const User = () => {
  const context = React.useContext(StoreContext);
  const { user } = context.userStore;

  if (!user) {
    return <div>User undefined</div>
  }

  return (
    <div>
      <h2>Title: {user.Title}</h2>
    </div>
  );
};

export default observer(User);
