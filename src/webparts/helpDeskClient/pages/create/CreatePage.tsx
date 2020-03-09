import * as React from "react";
import InputField from "../../components/form/input";
import TextareaField from "../../components/form/textarea";
import { withRouter, RouteComponentProps } from "react-router-dom";
import StoreContext from "@src/store";
import { ITicketCreate } from "@src/models/ITicketCreate";

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
      <InputField
        value={title}
        name="Title"
        required
        type="text"
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <br />
      <TextareaField
        value={comments}
        name="Comments"
        onChange={e => setComments(e.target.value)}
        placeholder="Comments"
      />
      <br />
      <button onClick={handleCreateTicket} disabled={title.length === 0}>
        Create ticket
      </button>
    </div>
  );
};

export default withRouter(CreatePage);
