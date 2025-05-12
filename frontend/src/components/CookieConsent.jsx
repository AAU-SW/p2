import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter'; // Import useLocation for navigation
import '../styles/CookieConsent.css';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [, navigate] = useLocation(); // Use navigate for routing

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="cookie-consent">
          <p>
            We use cookies to improve your experience. By using our site, you
            agree to our cookie policy.
          </p>
          <div className="cookie-buttons">
            <button className="cookie-button" onClick={handleAccept}>
              Accept
            </button>
            <button
              className="cookie-button learn-more"
              onClick={() => navigate('/learn-more')}
            >
              Learn More
            </button>
          </div>
        </div>
      )}
    </>
  );
};
