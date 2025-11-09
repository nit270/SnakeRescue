import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import "./App.css";

function EmergencyRescueForm() {
  const [form, setForm] = useState({
    location: "",
    contact: "",
    urgency: "Low - Spotted outside boundary",
    snakeType: "",
    situation: ""
  });

  const [submitted, setSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit to backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(process.env.REACT_APP_API_URL+"/rescue/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // ✅ Correct variable
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("✅ Emergency request submitted successfully!");
        setSubmitted(true);
        setForm({
          location: "",
          contact: "",
          urgency: "Low - Spotted outside boundary",
          snakeType: "",
          situation: ""
        });
      } else {
        alert(result.message || "❌ Failed to submit request!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("⚠️ Server error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emergency-rescue-container">
      {/* Topbar */}
      <div className="emergency-bar">
        <span className="bar-icon">&#9888;</span>
        <span className="bar-title">Emergency Rescue</span>
        <span className="bar-sub">24/7 Snake Rescue Service</span>
        <Link to="#" onClick={() => navigate(-1)}>
          <button className="bar-back">&#8592; Back</button>
        </Link>
      </div>

      {/* Form Heading */}
      <div className="emg-heading">
        <h2>Emergency Snake <br />Rescue</h2>
        <div className="emg-desc">
          Fill out this form immediately for emergency snake rescue services. Our team will respond within 30 minutes.
        </div>
      </div>

      {/* Emergency Form */}
      <form className="emg-form-card" onSubmit={handleSubmit}>
        <div className="emg-form-title">
          <span className="form-icon">&#9888;</span> Emergency Booking Form
        </div>
        <div className="emg-form-desc">
          Provide detailed information for quick response
        </div>

        <label>
          Location *
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="Exact location/address where snake was spotted"
          />
        </label>

        <label>
          Contact Number *
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            placeholder="Your active phone number"
            type="tel"
          />
        </label>

        <label>
          Urgency Level *
          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            required
          >
            <option>High - Snake in living area</option>
            <option>Medium - Snake in compound</option>
            <option>Low - Spotted outside boundary</option>
          </select>
        </label>

        <label>
          Snake Type (if known)
          <input
            name="snakeType"
            value={form.snakeType}
            onChange={handleChange}
            placeholder="E.g., Cobra, Python, Unknown"
          />
        </label>

        <label>
          Situation Description *
          <textarea
            name="situation"
            value={form.situation}
            onChange={handleChange}
            required
            placeholder="Describe the situation in detail: Where is the snake? Is it moving? Any immediate danger?"
          />
        </label>

        <button type="submit" className="emg-submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "⚠ SUBMIT EMERGENCY REQUEST"}
        </button>
        {submitted && (
          <div className="emg-success">Request submitted successfully! Redirecting...</div>
        )}
      </form>

      {/* Instructions Section */}
      <div className="emg-instructions">
        <div className="inst-section inst-yellow">
          <div className="inst-title">Safety Instructions</div>
          <ul>
            <li>
              <b className="red">DO NOT APPROACH</b><br />
              <span>Maintain at least 10 feet distance</span>
            </li>
            <li>
              <b>KEEP WATCHING</b><br />
              <span>Monitor snake's location from a safe distance</span>
            </li>
            <li>
              <b>MAKE NOISE</b><br />
              <span>Loud sounds may encourage it to leave</span>
            </li>
            <li>
              <b>STAY ACCESSIBLE</b><br />
              <span>Keep your phone on for team contact</span>
            </li>
          </ul>
          <div className="inst-response">
            <b>Response Time</b><br />
            <span>
              Our team will contact you within <b>15 minutes</b> and arrive within <b>30 minutes</b> of booking.
            </span>
          </div>
        </div>

        <div className="inst-section inst-pink">
          <b>Never Attempt</b><br />
          <ul>
            <li>Touching or harming the snake</li>
            <li>Using sticks or tools to move it</li>
            <li>Throwing objects at the snake</li>
            <li>Cornering or trapping it</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EmergencyRescueForm;
