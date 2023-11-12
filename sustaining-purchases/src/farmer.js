import React from 'react';
import { getUserImage, getUserName } from './firebase';

function Farmer() {
  const userImage = getUserImage() || 'default_image_url.jpg'; // Use a default image URL if getUserImage returns null
  const userName = getUserName() || 'Default Name'; // Use a default name if getUserName returns null

  return (
    <div className="farmer-container">
      <img src={userImage} alt="User" className="user-image" />
      <div className="user-info">
        <h2>{userName}</h2>
      </div>
    </div>
  );
}

export default Farmer;