import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '../components/Button';
import InfographicImage from '../assets/infographics_humans.svg';
import '../styles/Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loading

      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Redirect to home page
      navigate('/');
    } catch (error) {
    } finally {
      setLoading(false); // End loading regardless of outcome
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

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
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </Button>

            <Button type="button" onClick={goToSignup} disabled={loading}>
              Sign Up
            </Button>
          </form>

          {loading}
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
