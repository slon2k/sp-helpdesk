import * as React from "react";
import { ITicketListItemProps } from "./ITicketListItemProps";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";
import { distance } from "@src/util/DateTime";

const TicketListItem: React.FC<ITicketListItemProps> = ({ ticket }) => {
  return (
    <div role="row">
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <h4>{ticket.Title}</h4>
        <p>
          <span>Created: {distance(ticket.Created)}</span>{" "}
          <span>Status: {ticket.Status}</span>{" "}
          <Link to={`/ticket/${ticket.Id}`}> Details </Link>
        </p>
      </FocusZone>
    </div>
  );
};

export default observer(TicketListItem);
