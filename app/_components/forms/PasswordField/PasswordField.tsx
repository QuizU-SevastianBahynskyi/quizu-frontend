import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { TextField, TextFieldProps } from "../TextField/TextField";

const PasswordField = ({ className, ...rest }: TextFieldProps) => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => !prevState);
  };

  return (
    <TextField
      type={isPasswordVisible ? "text" : "password"}
      className={className}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      {...rest}
    >
      <ShowPasswordIcon
        isPasswordVisible={isPasswordVisible}
        togglePasswordVisibility={togglePasswordVisibility}
      />
    </TextField>
  );
};

const ShowPasswordIcon = ({
  isPasswordVisible,
  togglePasswordVisibility,
}: {
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}) => {
  const iconClassName =
    "w-8 h-8 p-1 transition-opacity duration-500 ease-in-out cursor-pointer";

  return (
    <div className="relative w-8 h-8 text-gray-300 hover:text-primary">
      <VscEye
        className={`${iconClassName} absolute ${
          isPasswordVisible ? "opacity-0" : "opacity-100"
        }`}
        onClick={togglePasswordVisibility}
      />
      <VscEyeClosed
        className={`${iconClassName} absolute ${
          isPasswordVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={togglePasswordVisibility}
      />
    </div>
  );
};

export default PasswordField;
