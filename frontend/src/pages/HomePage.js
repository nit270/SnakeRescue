import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Assume logo is here for step 1
import logo from "../assets/logo.jpeg";
//import img1 from "../assets/image3.JPG"; // This video is used in the slider as requested in step 3
import img2 from "../assets/IMG2.JPG";
import img3 from "../assets/IMG1.JPG";
import img4 from "../assets/image1.jpeg";
import img5 from "../assets/image5.jpg";

const images = [img2, img3, img4, img5];

// === UPDATED VIDEO GALLERY DATA ===
// Increased number of videos for a better grid look
const hindiVideos = [
  { id: "ztMoB5yP50g", title: "भारत के सबसे बड़े Snake Saver MIRZA MD ARIF के साथ पकड़ा एशिया का सबसे घातक सांप Russell Viper Snake" },
  { id: "zLLUkWXjM6Y", title: "भारत के Snake Saver MIRZA MD ARIF से जानें सांप को कैसे रेस्क्यू करें।" },
  { id: "Dno36L6-hrM", title: "Snake Rescue #109 | सांप को भोजन करना पड़ा महंगा कॉलोनी के बैक साइड चुहा खाकर टैंक के अंदर फस चुका" },
  { id: "5iXHi34wYFc", title: "Snake Rescue #124 अद्वितीय सांप की रेस्क्यू डरावनी नागिन की फुफकार ने गोविंदपुर वासियों हिला दिया" },
  { id: "zVleRzuNlw8", title: "Snake Rescue #150 एशिया में पाई जाने वाली एक बेहद जहरीला प्रजाति का बैंडेड करैत सांप रेस्क्यू किया।" },
  { id: "5eSnceTTQlc", title: "घर में सांप घुस जाए तो क्या करें? पूरी जानकारी और उपाय।" },
];
// ===================================

// Helper function to generate YouTube embed URL
const getYoutubeEmbedUrl = (videoId) => `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;

function HomePage() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);
  const [stats, setStats] = useState({ total: 1240, pending: 15, inProgress: 8, completed: 1217 });

  useEffect(() => {
    // fetchStatistics();
  }, []);


  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 200);
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

  // Custom logic for the first image (video reel)
  const isVideo = current === 0;
  const slideContent = isVideo ? (
      <div className="video-slide-wrap">
        <video
            src={images[current]}
            className={`slider-image ${fade ? "slider-fade-in" : "slider-fade-out"}`}
            alt={`slide ${current + 1}`}
            autoPlay
            muted
            loop
            playsInline /* Added for mobile compatibility */
        />
        {/* REMOVED: video-click-overlay since the slider is now a background */}

      </div>
  ) : (
      <img
          src={images[current]}
          className={`slider-image ${fade ? "slider-fade-in" : "slider-fade-out"}`}
          alt={`slide ${current + 1}`}
      />
  );


  return (
      <div className="snake-app">
        {/* Header - UPDATED */}
        <header className="navbar">
          <div className="navbar-brand">
            <img src={logo} alt="Snake Rescue Team Logo" className="logo" />
            Snake Rescue Team
          </div>
          <div className="nav-buttons">
            {/* 1. DONATE BUTTON ADDED HERE */}
            <Link to="/donate">
              <button className="donate-btn" style={{backgroundColor: '#FFC107', color: '#000', fontWeight: 'bold'}}>
                Donate Now 💖
              </button>
            </Link>

            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/signup"><button className="getstarted-btn">Get Started</button></Link>
          </div>
        </header>

        {/* ⚡ HERO SECTION - NOW INCORPORATES THE BACKGROUND SLIDER ⚡ */}
        <section className="hero">

          {/* === DYNAMIC SLIDER AS BACKGROUND === */}
          <div
              className="hero-background-slider"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
          >
            {/* Dark overlay for text readability, styled in CSS */}
            <div className="slider-overlay"></div>

            {/* Arrows and Dots are now functionally part of the background slider control */}
            <button className="slider-arrow left" onClick={prevSlide}>&lt;</button>
            <div className="slider-image-wrap">
              {slideContent}
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
          </div>
          {/* === END DYNAMIC SLIDER AS BACKGROUND === */}


          {/* Hero Content (text, buttons) - Must be positioned above the slider via CSS z-index */}
          <h1>Snake Rescue Team<br />Jamshedpur</h1>
          <p>
            <strong style={{color: '#bbff00ff'}}>Professional snake rescue services with 24/7 emergency response.<br />
              Protecting communities through safe snake removal and wildlife conservation.</strong>
          </p>

          <h2>आपत्कालीन साँप रेस्क्यू: "हर जीवन महत्वपूर्ण है"</h2>

          <a href="tel:+919031708006"><button className="emergency-btn">+91 9031708006</button></a>
          <p></p>
          <Link to="/EmergencyRescueForm">
            <button className="emergency-btn" style={{backgroundColor: '#ff2600ff'}}>
              Emergency Rescue Form
            </button>
          </Link>
          <div className="emergency-desc">
            Available 24/7 · Response within 30 minutes
          </div>
        </section>

        {/* Stats/Social Links Section */}
        <section>
          <div className="stats-container">
            <div className="stat-card total framed-content">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>{stats.total}+</h3>
                <p>Total Rescues</p>
              </div>
            </div>

            <div className="stat-card youtube-link framed-content" onClick={() => window.open("https://www.youtube.com/@SnakeFacts", "_blank")}>
              <div className="stat-icon" style={{color: '#ff0000'}}>▶️</div>
              <div className="stat-content">
                <h3>YouTube</h3>
                <p>Watch Latest Video</p>
              </div>
            </div>

            <div className="stat-card facebook-link framed-content" onClick={() => window.open("https://www.facebook.com/share/1FW6Dvx6eS/", "_blank")}>
              <div className="stat-icon" style={{color: '#1877f2'}}>📘</div>
              <div className="stat-content">
                <h3>Facebook</h3>
                <p>See Latest Posts</p>
              </div>
            </div>

            <div className="stat-card completed framed-content">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>{stats.completed}+</h3>
                <p>Rescues Completed</p>
              </div>
            </div>
          </div>

        </section>

        {/* Video Gallery Section (NOW USES SQUARE CARDS) */}
        <section className="video-gallery">
          <h2>🎥 साँप रेस्क्यू और सुरक्षा वीडियो (Videos)</h2>
          <p>हिंदी में महत्वपूर्ण जानकारी और लाइव रेस्क्यू वीडियो देखें।</p>
          <div className="video-grid">
            {hindiVideos.map((video) => (
                <div key={video.id} className="video-card framed-content">
                  {/* === NEW SQUARE CARD STRUCTURE === */}
                  <div className="video-square-wrapper">
                    <iframe
                        title={video.title}
                        src={getYoutubeEmbedUrl(video.id)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="video-iframe"
                    ></iframe>
                  </div>
                  {/* ================================== */}
                  <h4>{video.title}</h4>
                </div>
            ))}
          </div>
        </section>

        {/* Choose Portal */}
        <section className="chooseportal">
          <h2>Choose Your Portal</h2>
          <p>Select the appropriate portal based on your needs</p>
          <div className="portals">
            <div className="portal-card framed-content">
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

            <div className="portal-card framed-content">
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

            <div className="portal-card framed-content">
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

        {/* Safety Notes Section (New Section for improved readability) */}
        <section className="safety-notes">
          <h2>🐍 साँप सुरक्षा नोट्स (Safety Notes) 🚨</h2>
          <p>खतरनाक साँपों से सुरक्षित रहने और बचाव के लिए महत्वपूर्ण जानकारी।</p>
          <div className="notes-container">
            <div className="note-card framed-content">
              <h4>साँप दिखने पर क्या करें?</h4>
              <p><strong>शांत रहें:</strong> घबराएँ नहीं। साँप को भागने का मौका दें।</p>
              <p><strong>दूरी बनाएँ:</strong> साँप से सुरक्षित दूरी (कम से कम 6 फीट) बनाए रखें।</p>
              <p><strong>फ़ोन करें:</strong> तुरंत हमारी रेस्क्यू टीम को +91 9031708006 पर कॉल करें।</p>
            </div>
            <div className="note-card framed-content">
              <h4>साँप के काटने पर प्राथमिक उपचार:</h4>
              <p><strong>पीड़ित को शांत रखें:</strong> हिलने-डुलने से ज़हर तेज़ी से फैल सकता है।</p>
              <p><strong>कटे हुए स्थान को स्थिर करें:</strong> इसे दिल के स्तर से नीचे रखें।</p>
              <p><strong>अस्पताल जाएँ:</strong> तुरंत नज़दीकी एंटी-वेनम उपलब्ध अस्पताल पहुँचें। चीरा न लगाएँ।</p>
            </div>
            <div className="note-card framed-content">
              <h4>साँपों से बचाव के लिए:</h4>
              <p><strong>घर को साफ़ रखें:</strong> झाड़ियों और कबाड़ को हटाएँ जहाँ साँप छिप सकते हैं।</p>
              <p><strong>दरारें भरें:</strong> दीवारों और दरवाज़ों में दरारों को बंद करें।</p>
              <p><strong>रात में टॉर्च का उपयोग करें:</strong> अंधेरे में बाहर निकलते समय रोशनी का प्रयोग करें।</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why">
          <h2>Why Choose Us?</h2>
          <p>Professional, safe, and reliable snake rescue services</p>
          <div className="why-cards">
            <div className="why-card framed-content">
              <div className="why-icon green">⏰</div>
              <h4>24/7 Available</h4>
              <p>Round-the-clock emergency response for urgent situations.</p>
            </div>
            <div className="why-card framed-content">
              <div className="why-icon green">🧑‍🔬</div>
              <h4>Certified Experts</h4>
              <p>Trained professionals with years of experience.</p>
            </div>
            <div className="why-card framed-content">
              <div className="why-icon green">🛡️</div>
              <h4>Safe Methods</h4>
              <p>Humane and safe snake removal techniques.</p>
            </div>
            <div className="why-card framed-content">
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
              <h3>Snake Rescue Team Jamshedpur</h3>
              <div>snake rescue team jamshedpur</div>
              <div>snakerescuejsr555@gmail.com</div>
              <div>Jamshedpur, Jharkhand</div>
            </div>
            <div>
              <h4>Quick Links</h4>
              {/* ADD DONATE LINK TO FOOTER */}
              <div><Link to="/donate" style={{color: '#fff'}}>Support/Donate</Link></div>
              <div><a href="https://www.youtube.com/@SnakeFacts" target="_blank" rel="noopener noreferrer" style={{color: '#fff'}}>YouTube</a></div>
              <div><a href="https://www.facebook.com/share/1FW6Dvx6eS/" target="_blank" rel="noopener noreferrer" style={{color: '#fff'}}>Facebook</a></div>
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
              <div>+91 9031708006</div>
              <div>snakerescuejsr555@gmail.com</div>
              <div>Jamshedpur, Jharkhand</div>
            </div>
          </div>
          <div className="footer-bottom">
            © 2025 Snake Rescue Team Jamshedpur | All Rights Reserved
          </div>
        </footer>
      </div>
  );
}

export default HomePage;