import * as React from "react";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import { ITicket } from "@src/models/ITicket";
import TicketList from "../ticket-list";

const Tickets = () => {
  const context = React.useContext(StoreContext);
  const { ticketsToList, tickets } = context.ticketStore;
  return (
    <div>
      <h3>Ticket list:</h3>
      <TicketList tickets={ticketsToList} />
    </div>
  );
};

export default observer(Tickets);
