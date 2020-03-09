import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

interface IParams {
  id: string;
}

const DetailsPage: React.FC<RouteComponentProps<IParams>> = ({ match }) => {
  const { id } = match.params;
  return (
    <div>
      <h3>Details, ID: {id}</h3>
    </div>
  );
};

export default DetailsPage;
