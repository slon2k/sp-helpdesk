import { IUser } from "./IUser";

export interface IVersion {
  VersionId: number;
  Modified: Date;
  Editor: IUser;
  Status: string;
  StatusChanging: boolean;
  Comments: string;
}
