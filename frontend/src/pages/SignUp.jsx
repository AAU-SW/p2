import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '../components/Button';
import InfographicImage from '../assets/Infographics_Login_Page.svg';
import '../styles/SignUp.css';

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + '/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ username, email, password }),
        },
      );

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      console.log('Sign up successful:', data);
      location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome to SpareTime</h1>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
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
              <Button style={{ width: '100%' }} type="submit">
                Sign up
              </Button>
              <p>
                Already have a user? <Link href="/login">Login</Link>
              </p>
            </form>
          </div>
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
