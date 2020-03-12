import * as React from "react";
import StoreContext from "@src/store";

const Filter = () => {
  const context = React.useContext(StoreContext);
  const { setStatusFilter } = context.ticketStore;
  return (
    <div>
      <button onClick={() => setStatusFilter("")}>All</button>
      <button onClick={() => setStatusFilter("Active")}>Active</button>
      <button onClick={() => setStatusFilter("Closed")}>Closed</button>
    </div>
  );
};

export default Filter;
