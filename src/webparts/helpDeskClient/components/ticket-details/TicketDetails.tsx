import * as React from "react";
import { ITicketDetailsProps } from "./ITicketDetailsProps";

const TicketDetails: React.FC<ITicketDetailsProps> = ({ ticket, versions }) => {
  return (
    <div>
      <h3>{ticket.Title}</h3>
      <ul>
        {versions.map(item => (
          <li key={item.VersionId}>{item.Modified.toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketDetails;
