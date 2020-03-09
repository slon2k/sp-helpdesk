import * as React from "react";
import { ITicketListItemProps } from "./ITicketListItemProps";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const TicketListItem: React.FC<ITicketListItemProps> = ({ ticket }) => {
  return (
    <div>
      <h4>{ticket.Title}</h4>
      <p>
        <span>Created: {ticket.Created.toLocaleString()}</span>{" "}
        <span>Status: {ticket.Status}</span>{" "}
        <Link to={`/ticket/${ticket.Id}`}> Details </Link>
      </p>
    </div>
  );
};

export default observer(TicketListItem);
