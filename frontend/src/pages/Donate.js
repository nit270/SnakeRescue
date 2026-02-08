import React from 'react';
import { Link } from "react-router-dom";
import "./donate.css";
// Assuming you have an image file named qr-code-1.png and qr-code-2.png
// or you use a specific path to your uploaded QR codes.
// Replace the image source paths below with your actual paths.
import img from "../assets/qr-image.jpg";

const DonatePage = () => {
    return (
        // The .chooseportal class is used here primarily for overall page centering/padding
        // as defined in your global CSS.
        <div className="chooseportal">

            {/* The main container uses the new dedicated class for styling */}
            <div className="donate-page-container">

                {/* Header Section */}
                <h2>🐍 Support Our Snake Rescue Mission!</h2>
                <p>
                    Your donation directly fuels our efforts to safely **rescue, rehabilitate, and release snakes**,
                    ensuring the conservation of wildlife and the safety of our communities. Every rupee helps us cover
                    transport, medical supplies, and educational outreach.
                </p>

                {/* Motivation Thought - Uses the dedicated blockquote class */}
                <blockquote className="donate-blockquote">
                    <p>
                        **"We don't need to love every creature, but we are called to respect the role they play.
                        Your support helps us replace fear with understanding, ensuring safety for both snakes and people."**
                    </p>
                </blockquote>

                {/* Donation QR Section */}
                <h3>
                    Quick & Easy Donation Options
                </h3>

                {/* Layout uses the new flexible grid class */}
                <div className="donation-options-grid">

                    {/* QR Code 1 Card - Uses the dedicated card class */}
                    <div className="donation-card">
                        <h4>Option 1: Preferred UPI</h4>
                        <div className="qr-code-display">
                            {/* REPLACE THIS WITH YOUR QR CODE IMAGE PATH */}
                            <img src={img} alt="UPI QR Code 1" />
                        </div>
                        <p className="upi-id-text">
                            UPI ID: <span className="upi-id-highlight">**pathak.chandan91308@okicici**</span>
                        </p>
                    </div>


                </div>
                {/* Impact Section */}
                <h3>
                    Where Your Funds Go
                </h3>
                <ul>
                    <li><strong>Rescue Gear:</strong> Maintaining specialized tools (snake hooks, bags) necessary for safe capture.</li>
                    <li><strong>Veterinary Care:</strong> Providing immediate medical attention to injured snakes before release.</li>
                    <li><strong>Community Education:</strong> Funding workshops to teach safe coexistence and reduce human-snake conflict.</li>
                </ul>
                <p className="thank-you-message">
                    Thank you for being a lifeline for wildlife!
                </p>
               <div className="auth-home-link">
                         <Link className="auth-link" to="/">
                           ← Back to Home
                         </Link>
                       </div>
            </div>
        </div>
    );
};

export default DonatePage;