import React from "react";
import "../../../globals.css";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children?: React.ReactNode;
};

const TextField = ({ className, children, ...rest }: TextFieldProps) => {
  return (
    <label
      className={`input input-bordered flex items-center gap-2 w-full select-none bg-opacity-50 text-white ${className || ""}`}
    >
      <input type="text" className="grow" {...rest} />
      {children}
    </label>
  );
};

export { TextField };
export type { TextFieldProps };
