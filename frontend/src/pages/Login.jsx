import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '../components/Button';
import InfographicImage from '../assets/Infographics_Login_Page.svg';
import '../styles/Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

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

      const data = await response.json();
      if (!response.ok) {
        alert('Error logging in: ', data.message);
        console.error('Error logging in: ', data);
        throw Error(data.message);
      }
      localStorage.setItem('token', data.token);
      console.log('Login successful:', data);
      // Redirect to home page
      location.reload();
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setLoading(false);
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '8px',
                }}
              >
                <Button
                  style={{ width: '100%' }}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log in'}
                </Button>

                <p>
                  Don't have a user? <Link href="/sign-up">Sign Up</Link>
                </p>
              </div>
            </form>
          </div>

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
