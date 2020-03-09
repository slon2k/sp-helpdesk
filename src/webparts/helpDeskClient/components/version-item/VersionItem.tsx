import * as React from "react";
import { IVersionItemProps } from "./IVersionItemProps";

const VersionItem: React.FC<IVersionItemProps> = ({ version }) => {
  return (
    <div>
      <h3>
        {version.Editor.Title} {version.Modified.toLocaleString()}:
      </h3>
      {version.Comments && version.Comments !== "" && <p>{version.Comments}</p>}
      {version.StatusChanging && <p>Status changed to '{version.Status}'</p>}
    </div>
  );
};

export default VersionItem;
