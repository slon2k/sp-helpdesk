import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import TicketDetails from "../../components/ticket-details";

interface IParams {
  id: string;
}

const DetailsPage: React.FC<RouteComponentProps<IParams>> = ({ match }) => {
  const { id } = match.params;
  const context = React.useContext(StoreContext);
  const { ticket, loadingTicket, loadTicket, versions } = context.ticketStore;

  React.useEffect(() => {
    loadTicket(parseInt(id));
  }, [id, loadTicket]);

  if (loadingTicket) {
    return <div>Loading ticket...</div>;
  }

  if (ticket) {
    return <TicketDetails ticket={ticket} versions={versions} />;
  }

  return <div>Loading ticket...</div>;
};

export default observer(DetailsPage);
