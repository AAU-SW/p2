import { useState, useEffect } from 'react';
import { Card } from './Card';
import '../styles/UserWidget.css';

export const UserWidget = ({ style }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Card style={{ ...style, maxWidth: 'max-content' }}>
      <div className="user-info">
        <div className="user-avatar-placeholder">
          {loading ? '' : data?.username?.charAt(0).toUpperCase()}
        </div>
        <div className="user-details">
          <p
            className="user-name"
            style={
              loading
                ? { background: '#eee', width: 80, height: 18, margin: 0 }
                : {}
            }
          >
            {loading ? '' : data?.username}
          </p>
          <p
            className="user-email"
            style={
              loading
                ? { background: '#eee', width: 120, height: 14, margin: 0 }
                : {}
            }
          >
            {loading ? '' : data?.email}
          </p>
        </div>
      </div>
    </Card>
  );
};
