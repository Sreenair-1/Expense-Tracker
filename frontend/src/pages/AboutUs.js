import React from 'react';
import './AboutUs.css';

const teamMembers = [
  {
    id: 1,
    name: "",
    role: "",
    image: "",  // Replace with the actual image path
    description: ""
  },
  {
    id: 2,
    name: "",
    role: "",
    image: "",  // Replace with the actual image path
    description: ""
  },
  {
    id: 3,
    name: "",
    role: "",
    image: "",  // Replace with the actual image path
    description: ""
  },
  {
    id: 4,
    name: "",
    role: "",
    image: "",  // Replace with the actual image path
    description: ""
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
            <img src={`images/${member.image}`} alt={member.name} className="team-image" />
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
