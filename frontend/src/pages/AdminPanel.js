import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function AdminPanel() {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRequests();
    fetchStatistics();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rescue/all');
      const data = await response.json();
      if (response.ok) {
        setRequests(data);
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rescue/statistics');
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching statistics:', err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/rescue/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchRequests();
        fetchStatistics();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/rescue/delete/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchRequests();
        fetchStatistics();
      }
    } catch (err) {
      console.error('Error deleting request:', err);
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

  const filteredRequests = requests.filter(req => {
    const matchesFilter = filter === 'All' || req.status === filter;
    const matchesSearch = req.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.contact.includes(searchTerm) ||
                          (req.snakeType && req.snakeType.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="admin-panel">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-brand">
          <h1>🛡️ Admin Dashboard</h1>
          <p>Snake Rescue Management System</p>
        </div>
        <Link to="/dashboard">
          <button className="admin-back-btn">← Back to Home</button>
        </Link>
      </header>

      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Requests</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card progress">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-controls">
        <div className="filter-buttons">
          {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search by location, contact, or snake type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Requests Table */}
      <div className="requests-section">
        <h2>Rescue Requests ({filteredRequests.length})</h2>
        {loading ? (
          <p className="loading">Loading requests...</p>
        ) : filteredRequests.length > 0 ? (
          <div className="requests-table">
            {filteredRequests.map((req) => (
              <div key={req._id} className="request-card">
                <div className="request-header">
                  <div>
                    <h3>📍 {req.location}</h3>
                    <span className="request-time">{formatTime(req.createdAt)}</span>
                  </div>
                  <select
                    className={`status-select ${req.status.toLowerCase().replace(' ', '-')}`}
                    value={req.status}
                    onChange={(e) => updateStatus(req._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                
                <div className="request-body">
                  <div className="request-detail">
                    <strong>Contact:</strong> {req.contact}
                  </div>
                  <div className="request-detail">
                    <strong>Urgency:</strong> 
                    <span className={`urgency-badge ${req.urgency.split(' ')[0].toLowerCase()}`}>
                      {req.urgency}
                    </span>
                  </div>
                  {req.snakeType && (
                    <div className="request-detail">
                      <strong>Snake Type:</strong> {req.snakeType}
                    </div>
                  )}
                  <div className="request-detail full-width">
                    <strong>Situation:</strong> {req.situation}
                  </div>
                </div>

                <div className="request-actions">
                  <button className="action-btn view">📋 View Details</button>
                  <button className="action-btn call">📞 Call</button>
                  <button 
                    className="action-btn delete"
                    onClick={() => deleteRequest(req._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-requests">No requests found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
