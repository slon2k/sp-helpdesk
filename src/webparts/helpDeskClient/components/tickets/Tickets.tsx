import * as React from "react";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import TicketList from "../ticket-list";
import {
  Pivot,
  PivotItem,
  IPivotProps,
  PivotLinkSize
} from "office-ui-fabric-react/lib/Pivot";

const Tickets = () => {
  const context = React.useContext(StoreContext);
  const { ticketsToList } = context.ticketStore;
  return (
    <div>
      <Pivot>
        <PivotItem headerText="All">
          <TicketList tickets={ticketsToList} />
        </PivotItem>
        <PivotItem headerText="Active">
          <TicketList
            tickets={ticketsToList.filter(item => item.Status !== "Closed")}
          />
        </PivotItem>
        <PivotItem headerText="Closed">
          <TicketList
            tickets={ticketsToList.filter(item => item.Status === "Closed")}
          />
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default observer(Tickets);
