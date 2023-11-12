import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { isUserSignedIn,getUserImage, signOutUser } from './firebase';// Import the useAuth hook
import { useState, useEffect } from 'react';

function Nav() {
  
const naviagte = useNavigate();
const [userImage, setUserImage] = useState(null);
   
useEffect(() => {setUserImage(getUserImage());}, []);
  const handleButtonClick = () => {
    // Navigate to the desired route when the button is clicked
    naviagte('/signin');
  };
  const handleSignOut = async () => {
    try {
     
      await signOutUser();
      // Redirect or perform additional actions after sign-out
      naviagte('/main');
    } catch (error) {
      // Handle the error (e.g., display an error message)
      console.error(error);
    }
  };
  

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div className="nav">
        <motion.span className="material-symbols-outlined menu">menu</motion.span>

        <button onClick={handleSignOut}>signout</button>
        <span className="alignEnd">
          {isUserSignedIn() ? (
            <>
              <Link to="/account">
                <motion.img
                  src={userImage} // Use a default image URL if user.photoURL is undefined
                  alt="User"
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
              </Link>
            </>
          ) : (
            <>
              <motion.button
                style={{
                  background: '#c5d5ea ',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '27px',
                  height: '30px',
                  width: '90px',
                  margin: 'none',
                  fontWeight: 'bold',
                }}
                onClick={handleButtonClick}
              >
                Sign In
              </motion.button>
            </>
          )}
        </span>
      </div>
      <Outlet />
    </>
  );
}

export default Nav;