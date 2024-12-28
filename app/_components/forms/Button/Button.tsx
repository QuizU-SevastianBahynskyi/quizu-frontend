import "../../../globals.css";
import "./Button.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, onClick, value, ...rest}: ButtonProps) => {
  return (
    <button
      className={`btn text-secondary w-full p-2 bg-black/60 font-bold text-lg rounded button-hover-effect select-none ${className || ""}`}
      onClick={onClick}
      {...rest}
    >
      {value}
    </button>
  );
};

export default Button;
