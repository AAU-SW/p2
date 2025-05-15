import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/Button';
import '../styles/Settings.css';
export const Settings = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    setFormData({
      name: data.username,
      email: data.email,
      currency: 'DKK',
      language: 'English',
    });
  }, [data]);

  const [formData, setFormData] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + '/user',
        {
          username: formData.name,
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      alert('User updated successfully');
      fetchData();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('User updated failed');
    }
  };

  if (!formData) return <>No data!</>;

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="header">
          <h1
            style={{
              fontSize: '36px',
              marginLeft: '0px',
            }}
          >
            Settings
          </h1>
          <div className="user-section">
            <div className="user-info">
              <div className="user-avatar-placeholder">
                {formData.name?.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <p className="user-name">{formData.name}</p>
                <p className="user-email">{formData.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="settings-card">
          <h2 className="section-title">Account Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <h2 className="section-title">Preferences</h2>
            <div className="form-row three-columns">
              <div className="form-group">
                <label className="form-label">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="DKK">Danish Krone (DKK)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="English">English</option>
                </select>
              </div>
            </div>
            <div className="button-group">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
        <div className="settings-card">
          <div className="danger-zone">
            <h3 className="danger-title">Delete Account</h3>
            <p className="danger-text">
              Once you delete your account, you can't restore it. Please be
              certain.
            </p>
            <Button
              type="button"
              className="btn-delete"
              onClick={async () => {
                const isConfirmed = confirm(
                  'Are you sure you want to delete your account?',
                );
                if (isConfirmed) {
                  await axios.delete(import.meta.env.VITE_API_URL + '/user', {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                  });
                  location.reload();
                }
              }}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
