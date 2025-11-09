import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  accountType: "Customer"
};

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    let url = process.env.REACT_APP_API_URL+`/users?search=${encodeURIComponent(search)}`;
    const res = await fetch(url);
    const data = await res.json();
    setUsers(data);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.fullName || !form.email || (!editingId && !form.password)) {
      setError('Name, email, and password required.');
      return;
    }
    try {
      let url, method;
      if (editingId) {
        url = process.env.REACT_APP_API_URL+`/users/update/${editingId}`;
        method = "PUT";
      } else {
        url = process.env.REACT_APP_API_URL+"/users/add";
        method = "POST";
      }
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        fetchUsers();
        setForm(initialForm);
        setEditingId(null);
      } else {
        setError(data.msg || "Failed to save.");
      }
    } catch (err) {
      setError("Server error.");
    }
  };

  const handleEdit = user => {
    setForm({ ...user, password: "" });
    setEditingId(user._id);
    setError("");
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete user?")) return;
    await fetch(process.env.REACT_APP_API_URL+`/users/delete/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="user-mgmt-root">
      <header className="admin-header">
              <div className="admin-brand">
                <h1>User Management</h1>
                <p>Snake Rescue Management System</p>
              </div>
              <Link to="/dashboard">
                <button className="admin-back-btn">← Back to Home</button>
              </Link>
            </header>
      <form className="user-form" onSubmit={handleAddOrUpdate}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder={editingId ? "Set new password (optional)" : "Password"}
          value={form.password}
          onChange={handleChange}
          required={!editingId}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone || ""}
          onChange={handleChange}
        />
        <select name="accountType" value={form.accountType} onChange={handleChange}>
          <option>Customer</option>
          <option>Business</option>
          <option>Admin</option>
        </select>
        <button type="submit">{editingId ? "Update User" : "Add User"}</button>
        {editingId && <button type="button" onClick={() => {setForm(initialForm);setEditingId(null);}}>Cancel</button>}
        {error && <span className="user-error">{error}</span>}
      </form>

      <div className="user-search-box">
        <input
          type="text"
          placeholder="Search user by name, email, or type..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Account Type</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={6}>No users.</td></tr>
          ) : (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.accountType}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
export default UserManagement;
