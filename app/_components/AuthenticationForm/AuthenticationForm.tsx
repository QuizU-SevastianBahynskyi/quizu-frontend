import { MouseEventHandler, useState } from "react";
import "../../globals.css";
import "./AuthenticationForm.css";
import { TextField } from "../forms/TextField/TextField";
import Button from "../forms/Button/Button";
import PasswordField from "../forms/PasswordField/PasswordField";
import { VscAdd, VscSignIn } from "react-icons/vsc";

const AuthenticationForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthentication = () => {
    setIsLogin(!isLogin);
  };

  const Form = isLogin ? LoginForm : CreateAccountForm;
  const authenticationType = isLogin ? "Login" : "Create an Account";

  return (
    <div className="w-1/4 backdrop-blur-md bg-white/15 shadow-2xl p-6 rounded-3xl z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between">
      <h2 className="text-2xl text-center font-bold mb-4 text-fill text-white">
        {authenticationType}
      </h2>
      <div className="flex flex-col justify-center items-center flex-grow">
        <Form />
      </div>
      <div className="mt-3"></div>
      <div className="w-full flex justify-end">
        <ToggleAuthenticationIcon isLogin={isLogin} toggleAuthentication={toggleAuthentication} />
      </div>
    </div>
  );
};

const LoginForm = () => {
  return (
    <>
      <TextField type="text" placeholder="Username" className="mb-2" />
      <PasswordField className="mb-10" />
      <Button value="Login"/>
    </>
  );
};

const CreateAccountForm = () => {
  return (
    <>
      <TextField type="email" placeholder="Email" className="mb-2" />
      <TextField type="text" placeholder="Username" className="mb-2" />
      <PasswordField className="mb-10" />
      <Button value="Create an account" />
    </>
  );
};

const ToggleAuthenticationIcon = ({isLogin, toggleAuthentication}: { isLogin: boolean, toggleAuthentication: MouseEventHandler<HTMLButtonElement> }) => {
  const ToggleAuthenticationIcon = isLogin ? VscAdd : VscSignIn;

  return (
    <button 
        className="flex justify-end p-2 bg-base-300/40 border-none w-fit rounded-md hover:text-primary transition-all duration-300"
        onClick={toggleAuthentication}>
        <ToggleAuthenticationIcon
          className="icon-transition"
          size={28}
        />
      </button>
  );
};

export default AuthenticationForm;
