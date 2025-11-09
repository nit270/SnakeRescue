import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/rescue/all');
      const data = await response.json();

      if (response.ok) {
        setNotifications(data);
      } else {
        setError('Failed to load notifications');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return '#f6c700';
      case 'In Progress': return '#156cd5';
      case 'Completed': return '#21b657';
      default: return '#777';
    }
  };

  return (
    <div className="notification-page">
      <header className="notification-header">
        <h2>Rescue Notifications</h2>
        <Link to="/dashboard">
          <button className="back-btn">← Back to Home</button>
        </Link>
      </header>

      <div className="notification-list">
        {loading ? (
          <p className="loading">Loading notifications...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : notifications.length > 0 ? (
          notifications.map((note) => (
            <div key={note._id} className="notification-card">
              <div className="notification-status" style={{ backgroundColor: getStatusColor(note.status) }}>
                {note.status}
              </div>
              <h3>Emergency Rescue Request</h3>
              <div className="notification-details">
                <p><strong>Location:</strong> {note.location}</p>
                <p><strong>Contact:</strong> {note.contact}</p>
                <p><strong>Urgency:</strong> {note.urgency}</p>
                {note.snakeType && <p><strong>Snake Type:</strong> {note.snakeType}</p>}
                <p><strong>Situation:</strong> {note.situation}</p>
              </div>
              <span className="notification-time">{formatTime(note.createdAt)}</span>
            </div>
          ))
        ) : (
          <p className="no-notifications">No rescue requests available.</p>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
