import * as React from "react";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import { IPersonaSharedProps, Persona, PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

const User = () => {
  const context = React.useContext(StoreContext);
  const { user } = context.userStore;

  if (!user) {
    return <div>User undefined</div>;
  }

  return (
    <div>
      <Persona text={user.Title} size={PersonaSize.size32} />
    </div>
  );
};

export default observer(User);
