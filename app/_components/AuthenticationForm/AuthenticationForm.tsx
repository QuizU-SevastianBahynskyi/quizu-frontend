import { useState } from "react";
import "../../globals.css"
import "./AuthenticationForm.css";
import { TextField } from "../forms/TextField/TextField";
import Button from "../forms/Button/Button";
import PasswordField from "../forms/PasswordField/PasswordField";

const AuthenticationForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-1/4 backdrop-blur-md bg-white/15 shadow-2xl p-6 rounded-3xl z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between">
      <h2 className="text-2xl text-center font-bold mb-4 text-fill text-white">
        {isLogin ? "Login" : "Create an Account"}
      </h2>
      <div className="flex flex-col justify-center items-center flex-grow">
        {isLogin ? <LoginForm /> : <CreateAccountForm />}
      </div>
      <div className="mt-3"></div>
      <a
        onClick={() => setIsLogin(!isLogin)}
        className="font-bold text-lg select-none ml-auto text-cyan-300 cursor-pointer bg-black/30 px-2 rounded inline-block w-fit"
      >
        {isLogin ? "Create an account" : "Login"}
      </a>
    </div>
  );
};


const LoginForm = () => {
    return (
        <>
          <TextField type="text" placeholder="Username" />
          <PasswordField />
          <Button value="Login" />
        </>
    );
}

const CreateAccountForm = () => {
  return (
      <>
        <TextField type="email" placeholder="Email" />
        <TextField type="text" placeholder="Username" />
        <PasswordField />
        <Button value="Create an account" />
      </>
  );
}

export default AuthenticationForm;
