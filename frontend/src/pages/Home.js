import React, { useState, useEffect } from 'react'; 
import './Home.css';
import { useSpring, animated } from 'react-spring'; 
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const [text, setText] = useState(""); 
  const fullText = "Expense Tracker"; 

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    reverse: text === "" ? true : false,
    onRest: () => {
      if (text !== fullText) {
        setText(fullText.substring(0, text.length + 1));
      }
    },
    config: { duration: 100 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (text.length < fullText.length) {
        setText(fullText.substring(0, text.length + 1));
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval); 
  }, [text]);

  const navigate = useNavigate(); 

  const handleButtonClick = () => {
    navigate('/signup'); 
  };

  return (
    <div className="home">
      <div className="hero-card">
        <animated.h1 className="title" style={props}>
          {text} 
        </animated.h1>
        <p className="subtitle">Your personal finance manager, all in one place!</p>
        <button className="cta-button" onClick={handleButtonClick}>Get Started</button>
      </div>
    </div>
  );
};

export default Home;
