import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Customer",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Account created successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          role: "Customer",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert(result.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-icon">&#128272;</div>
        <h2 className="auth-title">Join Our Team</h2>
        <div className="auth-desc">Create your account to get started</div>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-title">Register</div>
          <div className="auth-form-desc">
            Fill in your details to create an account
          </div>

          <input
            className="auth-input"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <select
            className="auth-input"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option>Customer</option>
            <option>Business</option>
            <option>Admin</option>
          </select>
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button className="auth-btn" type="submit">
            Create Account
          </button>
        </form>
        <div className="auth-bottom">
          Already have an account?{" "}
          <Link className="auth-link" to="/login">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
