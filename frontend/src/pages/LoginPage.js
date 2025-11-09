import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_API_URL+"/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/dashboard"); // Redirect to your dashboard or home page
      } else {
        alert(result.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error! Please try again later.");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-icon">&#128272;</div>
        <h2 className="auth-title">Welcome Back</h2>
        <div className="auth-desc">Sign in to access your account</div>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-title">Login</div>
          <div className="auth-form-desc">
            Enter your credentials to access the platform
          </div>
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
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="auth-btn" type="submit">
            Sign In
          </button>
        </form>

        <div className="auth-bottom">
          Don't have an account?{" "}
          <Link className="auth-link" to="/signup">
            Sign up here
          </Link>
        </div>
        <div className="auth-home-link">
          <Link className="auth-link" to="/">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
