import * as React from "react";
import styles from "./HelpDeskClient.module.scss";
import { IHelpDeskClientProps } from "./IHelpDeskClientProps";
import { escape } from "@microsoft/sp-lodash-subset";
import ApiService from "@src/services/api";

export default class HelpDeskClient extends React.Component<
  IHelpDeskClientProps,
  { listTitle: string }
> {

  public render(): React.ReactElement<IHelpDeskClientProps> {
    return (
      <div className={styles.helpDeskClient}>
        <button onClick={() => ApiService.GetCurrentUser().then(console.log)}>
          Get user
        </button>
      </div>
    );
  }
}
