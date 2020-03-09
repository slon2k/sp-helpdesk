import * as React from "react";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import TicketList from "../ticket-list";

const Tickets = () => {
  const context = React.useContext(StoreContext);
  const { ticketsToList } = context.ticketStore;
  return (
    <div>
      <h3>Ticket list:</h3>
      <TicketList tickets={ticketsToList} />
    </div>
  );
};

export default observer(Tickets);
