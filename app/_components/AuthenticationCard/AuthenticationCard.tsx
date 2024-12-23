import "./AuthenticationCard.css";

const AuthenticationCard = () => {
    return (
        <div className="w-1/4 backdrop-blur-md bg-white/15 shadow-2xl p-6 rounded-3xl z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between">
            <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
            <div className="flex flex-col justify-center items-center flex-grow">
                <input className="w-full p-2 mb-4 border rounded" type="text" placeholder="Username" />
                <input className="w-full p-2 mb-4 border rounded" type="password" placeholder="Password" />
                <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Login</button>
            </div>
        </div>
    );
}

export default AuthenticationCard;
