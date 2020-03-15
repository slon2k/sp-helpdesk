import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";

interface IParams {
  id: string;
}

const DetailsPage: React.FC<RouteComponentProps<IParams>> = ({ match }) => {
  const { id } = match.params;
  const context = React.useContext(StoreContext);
  const { ticket, loadingTicket, loadTicket } = context.ticketStore;

  React.useEffect(() => {
    loadTicket(parseInt(id));
  }, [id, loadTicket]);

  if (loadingTicket) {
    return <div>Loading ticket...</div>;
  }

  if (ticket) {
    return <div>{ticket.Title}</div>;
  }

  return <div>Loading ticket...</div>;
};

export default withRouter(observer(DetailsPage));
