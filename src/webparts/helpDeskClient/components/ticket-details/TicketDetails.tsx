import * as React from "react";
import { ITicketDetailsProps } from "./ITicketDetailsProps";
import VersionItem from "../version-item";

const TicketDetails: React.FC<ITicketDetailsProps> = ({ ticket, versions }) => {
  return (
    <div>
      <h3>{ticket.Title}</h3>
      <ul>
        {versions.map(item => (
          <li key={item.VersionId}>
            <VersionItem version={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketDetails;
