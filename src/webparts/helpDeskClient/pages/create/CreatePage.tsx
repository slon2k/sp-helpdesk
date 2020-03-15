import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import StoreContext from "@src/store";
import { ITicketCreate } from "@src/models/ITicketCreate";
import {
  TextField,
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react";

const CreatePage: React.FC<RouteComponentProps> = ({ history }) => {
  const [title, setTitle] = React.useState("");
  const [comments, setComments] = React.useState("");

  const context = React.useContext(StoreContext);
  const { createTicket } = context.ticketStore;

  const handleCreateTicket = () => {
    const ticket: ITicketCreate = {
      Title: title
    };
    if (comments !== "") {
      ticket.Comments = comments;
    }
    createTicket(ticket).then(() => history.push("/"));
  };

  return (
    <div>
      <h3>Create new ticket</h3>
      <TextField
        value={title}
        name="Title"
        required
        placeholder="Title"
        onChange={(e, text) => setTitle(text)}
      />
      <br />
      <TextField
        value={comments}
        name="Comments"
        multiline
        placeholder="Add comments..."
        onChange={(e, text) => setComments(text)}
      />
      <div style={{marginTop: 20, marginBottom: 20}}>
        <DefaultButton onClick={() => history.push("/")}>Cancel</DefaultButton>
        <PrimaryButton onClick={handleCreateTicket} disabled={title === ""}>Create ticket</PrimaryButton>        
      </div>
    </div>
  );
};

export default withRouter(CreatePage);
