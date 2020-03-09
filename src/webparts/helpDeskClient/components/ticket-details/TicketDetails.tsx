import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import VersionItem from "../version-item";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import TextareaField from "../form/textarea";
import { ITicketUpdate } from "@src/models/ITicketUpdate";

const TicketDetails: React.FC<RouteComponentProps> = ({ history }) => {
  const context = React.useContext(StoreContext);
  const { ticket, versions, updateTicket, deleteTicket } = context.ticketStore;
  const [comments, setComments] = React.useState("");

  const handleAddComment = () => {
    updateTicket({ Id: ticket.Id, Comments: comments });
  };

  const handleCloseTicket = () => {
    const ticketUpdate: ITicketUpdate = {
      Id: ticket.Id,
      Status: "Closed"
    };
    if (comments.length > 0) {
      ticketUpdate.Comments = comments;
    }
    updateTicket(ticketUpdate).then(() => history.push("/"));
  };

  const handleReopenTicket = () => {
    const ticketUpdate: ITicketUpdate = {
      Id: ticket.Id,
      Status: "Open"
    };
    if (comments.length > 0) {
      ticketUpdate.Comments = comments;
    }
    updateTicket(ticketUpdate);
  };

  const handleDeleteTicket = () => {
    deleteTicket(ticket.Id).then(() => history.push("/"));
  };

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
      <TextareaField
        value={comments}
        name="Comments"
        onChange={e => setComments(e.target.value)}
        placeholder="Comments"
      />
      <button onClick={handleAddComment}>Add comment</button>
      {ticket.Status !== "Closed" && (
        <button onClick={handleCloseTicket}>Close ticket</button>
      )}
      {ticket.Status === "Closed" && (
        <button onClick={handleReopenTicket}>Reopen ticket</button>
      )}
      <button
        onClick={() => {
          if (window.confirm("Delete the item?")) {
            handleDeleteTicket();
          }
        }}
      >
        Delete ticket
      </button>
    </div>
  );
};

export default withRouter(observer(TicketDetails));
