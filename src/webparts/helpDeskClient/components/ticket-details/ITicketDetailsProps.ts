import { ITicket } from "@src/models/ITicket";
import { IVersion } from "@src/models/IVersion";

export interface ITicketDetailsProps {
  ticket: ITicket;
  versions: IVersion[];
}
