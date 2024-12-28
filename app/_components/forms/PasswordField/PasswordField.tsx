import React, { useState } from "react";
import "../../../globals.css";
import { TextField } from "../TextField/TextField";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const PasswordField = () => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => !prevState);
  };

  const Icon = isPasswordVisible ? VscEyeClosed : VscEye;

  return (
    <div className="relative w-full h-fit">
      <TextField
        id="password-input"
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        className="relative"
      />

      <div
        className="absolute right-3 flex items-center cursor-pointer p-0"
        onClick={togglePasswordVisibility}
      >
        <Icon className="w-5 h-5 p-0 text-gray-500" />
      </div>
    </div>
  );
};

export default PasswordField;
