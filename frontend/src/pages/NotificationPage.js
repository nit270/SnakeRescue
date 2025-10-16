import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch or load notifications (for now, static example)
    const storedNotifications = [
      {
        id: 1,
        title: "Rescue Request Received",
        message: "A new rescue request was submitted near Kadma.",
        time: "10:30 AM - Oct 15, 2025",
      },
      {
        id: 2,
        title: "Rescue Completed",
        message: "Rescue operation successfully completed in Bistupur.",
        time: "09:45 AM - Oct 14, 2025",
      },
      {
        id: 3,
        title: "New Safety Tip",
        message: "Avoid tall grass areas during monsoon season.",
        time: "08:00 PM - Oct 13, 2025",
      },
    ];

    setNotifications(storedNotifications);
  }, []);

  return (
    <div className="notification-page">
      <header className="notification-header">
        <h2>Rescue Notifications</h2>
        <Link to="/Dashboard">
          <button className="back-btn">← Back to Home</button>
        </Link>
      </header>

      <div className="notification-list">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div key={note.id} className="notification-card">
              <h3>{note.title}</h3>
              <p>{note.message}</p>
              <span className="notification-time">{note.time}</span>
            </div>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
