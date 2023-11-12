import React, { useState, useEffect } from 'react';
import { getUserImage, getUserName } from './firebase';

function Farmer() {
  const [userImage, setUserImage] = useState('default_image_url.jpg');
  const [userName, setUserName] = useState('Default Name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const image = await getUserImage();
        const name = getUserName();  // Assuming getUserName is synchronous

        setUserImage(image || 'default_image_url.jpg');
        setUserName(name || 'Default Name');
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once (on mount)

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
