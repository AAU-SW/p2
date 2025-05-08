import { useState } from 'react';
import { useLocation } from 'wouter';
import Button from '../components/Button';
import InfographicImage from '../assets/infographics_humans.svg';
import '../styles/SignUp.css';

export const SignUp = () => {
  // Sign up med username, email og password
  // http://localhost:4000/auth/Signup
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, navigate] = useLocation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.API_URL + '/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      console.log('Sign up successful:', data);
      // Redirect til login page (eller home page ????)
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome to SpareTime</h1>

          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
            <Button type="submit">Sign up</Button>
          </form>
        </div>
        <img
          src={InfographicImage}
          alt="Infographic"
          className="infographic-image"
        />
      </div>
    </div>
  );
};
