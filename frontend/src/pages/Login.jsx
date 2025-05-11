import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '../components/Button';
import InfographicImage from '../assets/Infographics_Login_Page.svg';
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

      const response = await fetch(
        import.meta.env.VITE_API_URL + '/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Redirect to home page
      window.location.href = '/p2/';
      //navigate('/p2'); does not work as it needs full page refresh?
    } catch (error) {
      console.error('Login failed', error);
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
          className="illustration"
        />
      </div>
    </div>
  );
};
