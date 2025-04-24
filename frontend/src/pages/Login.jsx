import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '../components/Button';
import InfographicImage from '../assets/infographics_humans.svg';
import '../styles/Login.css';

export const Login = () => {
    // Login med email og password
    // http://localhost:4000/auth/Login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [, navigate] = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            // Redirect to home page
            navigate('/home');
        } catch (error) {
            setError(error.message);
        }
    }
    // Eller sign up med username, email og password
    // redirect til SignUp.jsx
    // http://localhost:4000/auth/Signup
    const goToSignup = () => {
        navigate('/signup');
    };

    // Render login form
    // og sign up knap
    // og illustration
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-box">
                    <h1>Welcome to SpareTime</h1>

                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error">{error}</p>}
                        <Button type="submit">Log in</Button>

                        <Button type="button" onClick={goToSignup}>
                            Sign Up
                        </Button>

                    </form>
                </div>
                <img src={InfographicImage} alt="Infographic" className="infographic-image" />
            </div>
        </div>
    )
};
