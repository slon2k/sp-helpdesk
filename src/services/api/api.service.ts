import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users";
import { IList } from "@pnp/sp/lists";

export default class ApiService {
  private static list: IList;

  public static Init(listTitle: string) {
    this.list = sp.web.lists.getByTitle(listTitle);
  }

  public static async GetTickets(): Promise<any> {
    return await this.list.items
      .select(
        "Id",
        "Title",
        "Status",
        "Created",
        "Modified",
        "Author/Id, Author/Title"
      )
      .expand("Author")
      .getAll();
  }

  public static async GetTicketsForAuthor(id: number): Promise<any> {
    return await this.list.items
      .filter(`AuthorId eq ${id}`)
      .select(
        "Id",
        "Title",
        "Status",
        "Created",
        "Modified",
        "Author/Id, Author/Title"
      )
      .expand("Author")
      .getAll();
  }

  public static async GetTicket(id: number): Promise<any> {
    return await this.list.items
      .getById(id)
      .select("Title", "Comments", "Status", "EditorId", "AuthorId", "Versions")
      .expand("Versions")
      .get();
  }

  public static async GetCurrentUser(): Promise<any> {
    return await sp.web.currentUser.get();
  }

  public static async AddTicket(ticket: any) {
    return await this.list.items.add(ticket);
  }
}
