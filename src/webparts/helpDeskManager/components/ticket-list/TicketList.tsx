import * as React from "react";
import { ITicketListProps } from "./ITicketListProps";
import { observer } from "mobx-react-lite";
import TicketListItem from "../ticket-list-item";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";
import { List } from "office-ui-fabric-react/lib/List";

const TicketList: React.FC<ITicketListProps> = ({ tickets }) => {
  return (
    <div data-is-scrollable="true">
      <FocusZone direction={FocusZoneDirection.vertical}>
        <List
          items={tickets}
          onRenderCell={ticket => <TicketListItem ticket={ticket} />}
        />
      </FocusZone>
    </div>
  );
};

export default observer(TicketList);
