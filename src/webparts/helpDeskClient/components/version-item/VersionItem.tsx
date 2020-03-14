import * as React from "react";
import { IVersionItemProps } from "./IVersionItemProps";
import { ActivityItem, IActivityItemProps, Icon } from "office-ui-fabric-react";
import { distance } from "@src/util/DateTime";
import styles from "./VersionItem.module.scss";

const VersionItem: React.FC<IVersionItemProps> = ({ version }) => {
  const {
    Modified,
    VersionId,
    Editor,
    Status,
    StatusChanging,
    Comments
  } = version;
  const activityDescription = StatusChanging ? (
    [
      <strong>{Editor.Title}</strong>,
      <span> changed status to </span>,
      <strong>{Status}</strong>
    ]
  ) : (
    <strong>{Editor.Title}</strong>
  );
  const activityIcon =
    Status === "Open" ? (
      <Icon iconName="UserWarning" style={{ color: "red" }} />
    ) : Status === "Closed" ? (
      <Icon iconName="ReminderPerson" style={{ color: "green" }} />
    ) : (
      <Icon iconName="Telemarketer" style={{ color: "orange" }} />
    );

  const activityItemProps: IActivityItemProps = {
    activityDescription,
    comments: Comments,
    timeStamp: distance(Modified),
    activityIcon
  };
  return (
    <div className={styles.VersionItem}>
      <ActivityItem
        key={VersionId}
        {...activityItemProps}
        className={styles.item}
      />
    </div>
  );
};

export default VersionItem;
