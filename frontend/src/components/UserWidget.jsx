import { useState, useEffect } from 'react';
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

  if (loading) return null; // or a spinner
  if (!data) return <div>No user data</div>;

  return (
    <div className="user-section" style={style}>
      <div className="user-info">
        <div className="user-avatar-placeholder">
          {data.username?.charAt(0).toUpperCase()}
        </div>
        <div className="user-details">
          <p className="user-name">{data.username}</p>
          <p className="user-email">{data.email}</p>
        </div>
      </div>
    </div>
  );
};
