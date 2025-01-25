import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const fetchCredentials = () => {
        return fetch('/credentials.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching credentials");
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                throw error;
            });
    };

    const handleClick = async () => {
        if (!name || !password) {
            alert("Please enter both username and password!");
            return;
        }

        setLoading(true);
        try {
            const credData = await fetchCredentials();

            if (!credData || typeof credData !== "object") {
                alert("Credentials data is not valid. Please try again later.");
                return;
            }

            if (!(name in credData)) {
                alert("User not found. Please sign up.");
                return;
            }

            if (password !== credData[name]) {
                alert("Incorrect credentials. Please try again!");
            } else {
                setIsAuthenticated(true);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center p-6">
            <div className="bg-white border-2 border-blue-200 rounded-xl shadow-lg w-full max-w-md p-6">
                <h1 className="text-blue-600 text-2xl font-bold text-center mb-4">
                    Welcome!
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Are you a customer or a company? Select your path below.
                </p>
                <div className="flex flex-col space-y-4">
                    <NavLink
                        to="/publicpricingtool"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-center"
                    >
                        I am a Customer - Compare Prices
                    </NavLink>
                    <div className="border-t border-gray-300 pt-4">
                        <h2 className="text-gray-700 font-medium text-center mb-2">
                            Company Login
                        </h2>
                        <input
                            value={name}
                            onChange={handleNameChange}
                            className="border-2 border-gray-300 w-full p-2 rounded mb-3"
                            placeholder="Company email..."
                        />
                        <input
                            value={password}
                            onChange={handlePasswordChange}
                            className="border-2 border-gray-300 w-full p-2 rounded mb-3"
                            placeholder="Password..."
                            type="password"
                        />
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
                            onClick={handleClick}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
