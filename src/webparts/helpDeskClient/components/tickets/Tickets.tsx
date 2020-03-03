import * as React from 'react'
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";

const Tickets = () => {
  const context = React.useContext(StoreContext);
  const { ticketsToList } = context.ticketStore;
  return (
    <div>
      {ticketsToList.map(ticket => {
        <div>{ticket.Title}</div>
      })}
    </div>
  )
}

export default observer(Tickets)
