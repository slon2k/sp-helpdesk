import * as React from "react";
import { IInputField } from "./IInputField";

const InputField: React.FC<IInputField> = props => {
  return <input {...props} />;
};

export default InputField;
