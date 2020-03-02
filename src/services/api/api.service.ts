import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users";

export default class ApiService {
  private static listTitle: string;

  public static Init(listTitle: string) {
    this.listTitle = listTitle;
  }

  public static async GetTickets(): Promise<any> {
    const list = sp.web.lists.getByTitle(this.listTitle);
    return await list.items
      .select("Id", "Title", "Status", "Author/Id, Author/Title")
      .expand("Author")
      .getAll();
  }

  public static async GetTicketsForAuthor(id: number): Promise<any> {
    const list = sp.web.lists.getByTitle(this.listTitle);
    return await list.items
      .filter(`AuthorId eq ${id}`)
      .select("Id", "Title", "Status", "Author/Id, Author/Title")
      .expand("Author")
      .getAll();
  }

  public static async GetTicket(id: number): Promise<any> {
    const list = sp.web.lists.getByTitle(this.listTitle);
    return await list.items
      .getById(id)
      .select("Title", "Comments", "Status", "EditorId", "AuthorId", "Versions")
      .expand("Versions")
      .get();
  }

  public static async GetCurrentUser(): Promise<any> {
    return await sp.web.currentUser.get();
  }

  public static async AddTicket(ticket: any) {
    return await sp.web.lists.getByTitle(this.listTitle).items.add(ticket);
  }
}
