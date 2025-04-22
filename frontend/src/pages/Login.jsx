import { useState } from 'react';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';
import { Button } from '../components/Button';
import InfographicImage from '../assets/infographics_humans.svg';
import '../styles/Login.css';

export const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h1>SpareTime</h1>

          <SignIn />

          {/* Sign Up knap */}
          {!showSignUp && (
            <Button
              className="signup-button"
              type="button"
              onClick={() => setShowSignUp(true)}
            >
              Sign Up
            </Button>
          )}
            {/* Sign Up form (vises under login) */}
            {showSignUp && (
            <div className="signup-form">
              <SignUp />
            </div>
          )}
        </div>
          

        {/* Højre side: Illustration */}
        <div className="illustration">
          <img src={InfographicImage} alt="People working together" />
        </div>
      </div>
    </div>

  );
};

