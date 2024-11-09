// src/pages/Home.js
import React, { useState, useEffect } from 'react'; 
import './Home.css';
import { useSpring, animated } from 'react-spring'; // For animations
import { useNavigate } from 'react-router-dom'; // For routing

const Home = () => {
  const [text, setText] = useState("");  // Text to manage typing effect
  const fullText = "Expense Tracker"; // Full text for the header

  // Spring animation for opacity fade-in
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    reverse: text === "" ? true : false,
    onRest: () => {
      // Trigger typing effect when fade-in is done
      if (text !== fullText) {
        setText(fullText.substring(0, text.length + 1));
      }
    },
    config: { duration: 100 } // Delay between each letter
  });

  useEffect(() => {
    // Typing effect logic
    const interval = setInterval(() => {
      if (text.length < fullText.length) {
        setText(fullText.substring(0, text.length + 1)); // Add one letter at a time
      } else {
        clearInterval(interval); // Stop once full text is typed
      }
    }, 200); // Adjust speed here
    return () => clearInterval(interval); // Cleanup when component unmounts
  }, [text]);

  const navigate = useNavigate(); // For navigation

  const handleButtonClick = () => {
    navigate('/login');  // Navigate to login page
  };

  return (
    <div className="home">
      <div className="hero-card">
        <animated.h1 className="title" style={props}>
          {text} {/* Display text one letter at a time */}
        </animated.h1>
        <p className="subtitle">Your personal finance manager, all in one place!</p>
        <button className="cta-button" onClick={handleButtonClick}>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
