import React from 'react';
import './AboutUs.css';



const teamMembers = [
  {
    id: 1,
    name: "Garvit Tyagi",
    image: "../images/garvit.jpg"
  },
  {
    id: 2,
    name: "Sreehari Nair",
    image: "../images/sree.jpg"
  },
  {
    id: 3,
    name: "Manav Dalwani",
    image: "../images/manav.jpg"
  },
  {
    id: 4,
    name: "Janak Fabyani",
    image: "../images/janak.jpg"
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