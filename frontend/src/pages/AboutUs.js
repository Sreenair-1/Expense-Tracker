import React from 'react';
import './AboutUs.css';
import garvitImage from '../images/garvit.jpg';
import sreeImage from '../images/sree.jpg';
import manavImage from '../images/manav.jpg';
import janakImage from '../images/janak.jpg';



const teamMembers = [
  {
    id: 1,
    name: "Garvit Tyagi",
    image: garvitImage
  },
  {
    id: 2,
    name: "Sreehari Nair",
    image: sreeImage
  },
  {
    id: 3,
    name: "Manav Dalwani",
    image: manavImage
  },
  {
    id: 4,
    name: "Janak Fabyani",
    image: janakImage
  }
];

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>Meet the team behind the Expense Tracker</p>
      <div className="team-container">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member">
            <img src={member.image} alt={member.name} className="team-image" />
            <h2>{member.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;