import * as React from "react";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import TicketList from "../ticket-list";
import Filter from "../filter";

const Tickets = () => {
  const context = React.useContext(StoreContext);
  const { filteredTickets } = context.ticketStore;
  return (
    <div>
      <Filter />
      <TicketList tickets={filteredTickets} />
    </div>
  );
};

export default observer(Tickets);
