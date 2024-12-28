import React from "react";
import "../../../globals.css";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ className, ...rest}: TextFieldProps) => {
  return (
    <input
      className={`w-full p-2 border rounded outline-none ${className || ""}`}
      {...rest}
    />
  );
};

export { TextField };
export type { TextFieldProps };
