import * as React from "react";
import { ITicketListProps } from "./ITicketListProps";
import { observer } from "mobx-react-lite";
import TicketListItem from "../ticket-list-item";

const TicketList: React.FC<ITicketListProps> = ({ tickets }) => {
  console.log("Ticket list", tickets);
  return (
    <div>
      <h3>list</h3>
      <ol>
        {tickets.map(item => (
          <li key={item.Id}>
            <TicketListItem ticket={item} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default observer(TicketList);
