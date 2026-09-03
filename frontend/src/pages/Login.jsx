import { useState } from "react";
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import HeaderLight from "../components/HeaderLight";

export default function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!username.trim() || !password.trim()) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }

        try {
            await authService.login(username, password);
            navigate('/homepage');
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong.')
        }

        console.log("Login form working: {username, password}")
    };

    return (
        <div className="login-page">
            <HeaderLight />
            <div className="login-card">
                <h2>Welcome, to Airbnb!</h2>
                <div className="error-banner">{errorMessage}</div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="inputs">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className={errorMessage && !username ? "input-error" : ""}/>
                    </div>
                    <div className="inputs">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={errorMessage && password.length < 8 ? "input-error" : ""}/>
                    </div>


                    <div className="login-btn">
                        <p>Forgot password?</p>
                        <button type="submit" id="login-btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
   
};

