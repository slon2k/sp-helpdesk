import * as React from "react";
import { ITicketListItemProps } from "./ITicketListItemProps";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";
import { Icon, IIconProps } from "office-ui-fabric-react/lib/Icon";
import { distance } from "@src/util/DateTime";
import styles from "./TicketListItem.module.scss";
import { css } from "office-ui-fabric-react/lib/Utilities";

const renderIcon = (status: string): React.ReactElement => {
  if (status.toLowerCase() === "open") {
    return (
      <Icon
        iconName="UserWarning"
        className={css(styles.icon, styles.iconRed)}
      />
    );
  }

  if (status.toLowerCase() === "closed") {
    return (
      <Icon
        iconName="ReminderPerson"
        className={css(styles.icon, styles.iconGreen)}
      />
    );
  }

  return (
    <Icon
      iconName="Telemarketer"
      className={css(styles.icon, styles.iconYellow)}
    />
  );
};

const TicketListItem: React.FC<ITicketListItemProps> = ({ ticket }) => {
  return (
    <div role="row" className={styles.TicketListItem}>
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <Link to={`/ticket/${ticket.Id}`}>
          <div className={styles.item}>
            <div className={styles.status}>{renderIcon(ticket.Status)}</div>
            <div className={styles.info}>
              <div className={styles.title}>{ticket.Title}</div>
              <div>
                <span>Created: {distance(ticket.Created)}</span>{"; "}
                <span>Modified: {distance(ticket.Modified)}</span>
              </div>
            </div>
          </div>
        </Link>
      </FocusZone>
    </div>
  );
};

export default observer(TicketListItem);
