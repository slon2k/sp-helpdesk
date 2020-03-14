import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import VersionItem from "../version-item";
import StoreContext from "@src/store";
import { observer } from "mobx-react-lite";
import { ITicketUpdate } from "@src/models/ITicketUpdate";
import {
  TextField,
  DefaultButton,
  PrimaryButton
} from "office-ui-fabric-react";

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

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string
  ): void => {
    setComments(text || "");
  };

  return (
    <div>
      <h3>{ticket.Title}</h3>
      <div>
        {versions.map(item => (
          <VersionItem version={item} />
        ))}
      </div>

      <TextField
        placeholder="Add comments..."
        multiline
        name="Comments"
        value={comments}
        onChange={handleChange}
      />
      <br />
      <DefaultButton onClick={() => history.push("/")}>Cancel</DefaultButton>
      {ticket.Status !== "Closed" && (
        <PrimaryButton onClick={handleAddComment} disabled={comments === ""}>
          Add comments
        </PrimaryButton>
      )}

      {ticket.Status === "Closed" && (
        <PrimaryButton onClick={handleReopenTicket} disabled={comments === ""}>
          Reopen ticket
        </PrimaryButton>
      )}

{/*       <button onClick={handleReopenTicket}>Reopen ticket</button>
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
 */}

    </div>
  );
};

export default withRouter(observer(TicketDetails));
