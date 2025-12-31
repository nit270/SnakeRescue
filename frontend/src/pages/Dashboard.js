import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/image1.jpeg";
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
    
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "", });

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="snake-app">
      {/* Header */}
      <header className="navbar">
  <div className="navbar-brand">Snake Rescue Team</div>

  {user.email==="admin@gmail.com" ? (
    <div className="nav-user-section">
      {/* {User Management} */}
      <button disabled={true}
        className="usr-mngt-btn"
        onClick={() => navigate("/users")}
      >
        User Management
      </button>
      {/* {Admin Panel} */}
      <button disabled={true}
        className="admin-btn"
        onClick={() => navigate("/admin")}
      >
        Admin Panel
      </button>
      {/* Rescue Notification Button */}
      <button
        className="notification-btn"
        onClick={() => navigate("/notifications")}
      >
        🔔 Rescue Notification
      </button>

      {/* User Info */}
      <div className="user-info">
        <div className="user-icon">👤</div>
        <span className="user-name">{user.fullName}</span>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  ) : (
    <div className="nav-user-section">
   
      {/* User Info */}
      <div className="user-info">
        <div className="user-icon">👤</div>
        <span className="user-name">{user.fullName}</span>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )}
</header>


      {/* Hero */}
      <section className="hero">
              <h1>Snake Rescue Team<br />Jamshedpur</h1>
              <p>
                Professional snake rescue services with 24/7 emergency response.<br />
                Protecting communities through safe snake removal and wildlife conservation.
              </p>
              <button  className="emergency-btn">+91 9031708006</button>
              <p></p>
             <Link to="/EmergencyRescueForm"> <button className="emergency-btn">
                Emergency Snake Rescue
              </button></Link>
              <div className="emergency-desc">
                Available 24/7 · Response within 30 minutes
              </div>
            </section>
        
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
          {/* Customer Portal */}
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
            <button className="portal-btn customer">Enter Customer Portal</button>
          </div>
          {/* Business Portal */}
          {/* <div className="portal-card">
            <div className="portal-icon blue">🏢</div>
            <h3>Business Portal</h3>
            <p>Digital security solutions for societies and businesses.</p>
            <ul>
              <li>Digital Security Services</li>
              <li>Corporate Solutions</li>
              <li>Advisory Services</li>
              <li>Awareness Programs</li>
            </ul>
            <button className="portal-btn business">Enter Business Portal</button>
          </div> */}
          {/* Admin Portal */}
          {/* <div className="portal-card">
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
          </div> */}
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
            <div>Digital Security Services</div>
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
