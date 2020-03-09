import * as React from "react";
import { ITicketListProps } from "./ITicketListProps";
import { observer } from "mobx-react-lite";

const TicketList: React.FC<ITicketListProps> = ({ tickets }) => {
  console.log("Ticket list", tickets);
  return (
    <div>
      <h3>list</h3>
      <ul>
        {tickets.map(item => (
          <li key={item.Id}>{item.Title}</li>
        ))}
      </ul>
    </div>
  );
};

export default observer(TicketList);
