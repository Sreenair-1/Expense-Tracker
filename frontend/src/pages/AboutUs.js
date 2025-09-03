import React from 'react';
import './AboutUs.css';

// Note: Image files are not included in this repository
// Using placeholder images for team members
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VGVhbTwvdGV4dD48L3N2Zz4=';

const teamMembers = [
  {
    id: 1,
    name: "Garvit Tyagi",
    image: placeholderImage
  },
  {
    id: 2,
    name: "Sreehari Nair",
    image: placeholderImage
  },
  {
    id: 3,
    name: "Manav Dalwani",
    image: placeholderImage
  },
  {
    id: 4,
    name: "Janak Fabyani",
    image: placeholderImage
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