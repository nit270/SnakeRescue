import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";
import img5 from "../assets/image5.jpg";

const images = [img1, img2, img3, img4, img5];


function HomePage() {
const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });

   useEffect(() => {
      fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/rescue/statistics');
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching statistics:', err);
    }
  };

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 200); // match CSS fade out time
  };
  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
      setFade(true);
    }, 200);
  };

  // Touch (swipe)
  let startX = 0;
  const onTouchStart = e => { startX = e.touches[0].clientX; }
  const onTouchEnd = e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    else if (endX - startX > 50) prevSlide();
  }

  // Autoplay, reset fade
  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 3200);
    }
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line
  }, [current, paused]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);
  return (
    <div className="snake-app">
      {/* Header */}
      <header className="navbar">
        <div className="navbar-brand">Snake Rescue Team</div>
        <div className="nav-buttons">
          <Link to="/login"><button className="login-btn">Login</button></Link>
          <Link to="/signup"><button className="getstarted-btn">Get Started</button></Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1>Snake Rescue Team<br />Jamshedpur</h1>
        <p>
          Professional snake rescue services with 24/7 emergency response.<br />
          Protecting communities through safe snake removal and wildlife conservation.
        </p>
       <Link to="/EmergencyRescueForm"> <button className="emergency-btn">
          Emergency Snake Rescue
        </button></Link>
        <div className="emergency-desc">
          Available 24/7 · Response within 30 minutes
        </div>
      </section>

       <section>
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

       </section>
      {/* Popup Form */}
       {/* {  Slider  } */}
      <section>  
        <div
      className="slider-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <button className="slider-arrow left" onClick={prevSlide}>&lt;</button>
      <div
        className="slider-image-wrap"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[current]}
          className={`slider-image ${fade ? "slider-fade-in" : "slider-fade-out"}`}
          alt={`slide ${current + 1}`}
        />
      </div>
      <button className="slider-arrow right" onClick={nextSlide}>&gt;</button>
      <div className="slider-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={idx === current ? "slider-dot active" : "slider-dot"}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrent(idx);
                setFade(true);
              }, 200);
            }}
          />
        ))}
      </div>
    </div></section>

       {/* Choose Portal */}
      <section className="chooseportal">
        <h2>Choose Your Portal</h2>
        <p>Select the appropriate portal based on your needs</p>
        <div className="portals">
          <div className="portal-card">
            <div className="portal-icon green">★</div>
            <h3>Customer Portal</h3>
            <p>For individuals and residents: emergency snake removal.</p>
            <ul>
              <li>Emergency Booking</li>
              <li>Community Feeds</li>
              <li>Tips & Safety Rules</li>
              <li>Learning Materials</li>
            </ul>
            <button className="portal-btn customer">
              Enter Customer Portal
            </button>
          </div>

          <div className="portal-card">
            <div className="portal-icon blue">🏢</div>
            <h3>Business Portal</h3>
            <p>Digital security solutions for societies and businesses.</p>
            <ul>
              <li>Digital Security Services</li>
              <li>Corporate Solutions</li>
              <li>Advisory Services</li>
              <li>Awareness Programs</li>
            </ul>
            <button className="portal-btn business">
              Enter Business Portal
            </button>
          </div>

          <div className="portal-card">
            <div className="portal-icon purple">⚙️</div>
            <h3>Admin Portal</h3>
            <p>Management portal for administrators.</p>
            <ul>
              <li>User Management</li>
              <li>Booking Management</li>
              <li>Analytics & Reports</li>
              <li>Content Management</li>
            </ul>
            <button className="portal-btn admin">Enter Admin Portal</button>
          </div>
        </div>
      </section>
     
      {/* Why Choose Us */}
      <section className="why">
        <h2>Why Choose Us?</h2>
        <p>Professional, safe, and reliable snake rescue services</p>
        <div className="why-cards">
          <div className="why-card">
            <div className="why-icon green">⏰</div>
            <h4>24/7 Available</h4>
            <p>Round-the-clock emergency response for urgent situations.</p>
          </div>
          <div className="why-card">
            <div className="why-icon green">🧑‍🔬</div>
            <h4>Certified Experts</h4>
            <p>Trained professionals with years of experience.</p>
          </div>
          <div className="why-card">
            <div className="why-icon green">🛡️</div>
            <h4>Safe Methods</h4>
            <p>Humane and safe snake removal techniques.</p>
          </div>
          <div className="why-card">
            <div className="why-icon green">🌱</div>
            <h4>Conservation</h4>
            <p>Committed to wildlife conservation and safety.</p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer>
        <div className="footer-main">
          <div>
            <h3>Snake Rescue Team</h3>
            <div>snake rescue team jamshedpur</div>
            <div>snake@rescue.com</div>
            <div>Jamshedpur, Jharkhand</div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <div>Facebook</div>
            <div>Advisory Services</div>
          </div>
          <div>
            <h4>Services</h4>
            <div>Snake Rescue</div>
            <div>Wildlife Removal</div>
            <div>Emergency Response</div>
            <div>Awareness Programs</div>
          </div>
          <div>
            <h4>Contact Info</h4>
            <div>+91 87965-41210</div>
            <div>snake@rescue.com</div>
            <div>Jamshedpur, Jharkhand</div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Snake Rescue Team | All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
