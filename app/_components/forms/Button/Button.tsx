import "../../../globals.css";
import "./Button.css";

type ButtonProps = {
  onClick?: () => void;
  value: string;
};

const Button = ({ onClick, value }: ButtonProps) => {
  return (
    <button
      className="w-full p-2 bg-black/60 text-cyan-300 font-bold text-lg rounded button-hover-effect select-none"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
