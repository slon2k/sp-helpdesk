import * as React from "react";
import { ITicketListItemProps } from "./ITicketListItemProps";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { distance } from "@src/util/DateTime";
import styles from "./TicketListItem.module.scss";

const TicketListItem: React.FC<ITicketListItemProps> = ({ ticket }) => {
  return (
    <div role="row" className={styles.TicketListItem}>
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <Link to={`/ticket/${ticket.Id}`}>
          <div>
            <Icon iconName="CompassNW" />
            {ticket.Status}
          </div>
          <div>
            <h4>{ticket.Title}</h4>
            <p>
              <span>Created: {distance(ticket.Created)}</span>
            </p>
          </div>
        </Link>
      </FocusZone>
    </div>
  );
};

export default observer(TicketListItem);
