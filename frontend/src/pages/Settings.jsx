import { useState } from "react";
import "../styles/Settings.css";
import Avatar from "../assets/Avatar.jpeg";
export const Settings = () => {
  const [formData, setFormData] = useState({
    name: "Kevin Nielsen",
    email: "kevin1994@gmail.com",
    currency: "DKK",
    language: "English",

  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value

    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");

  };
  return (
    <div className="app-container">
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Settings</h1>
          <div className="user-section">
            <button className="notification-btn">
              <svg className="notification-icon" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <div className="user-info">
              <img src={Avatar} alt="User avatar" className="user-avatar" />
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
              <button
                type="submit"
                className="btn-primary"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div className="settings-card">
          <div className="danger-zone">
            <h3 className="danger-title">Delete Account</h3>
            <p className="danger-text">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              type="button"
              className="btn-delete"
              onClick={() => confirm("Are you sure you want to delete your account? This action cannot be undone.")}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
