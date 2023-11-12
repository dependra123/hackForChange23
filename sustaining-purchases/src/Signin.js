// src/components/AuthComponent.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp, signIn, signInWithGoogle, signOutUser, isUserSignedIn, getUserImage } from './firebase'; // Adjust the path based on your project structure

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const naviagte = useNavigate();

  useEffect(() => {
    // Check user sign-in status and fetch user image on component mount
    setUserSignedIn(isUserSignedIn());
    setUserImage(getUserImage());
  }, []);

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      // Redirect or perform additional actions after successful sign-up
      naviagte('/main');
    } catch (error) {
      // Handle the error (e.g., display an error message)
      console.error(error);
    }
  };

  const handleSignInWithEmail = async () => {
    try {
      await signIn(email, password);
      // Redirect or perform additional actions after successful sign-in
      naviagte('/main');
    } catch (error) {
      // Handle the error (e.g., display an error message)
      console.error(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      // Redirect or perform additional actions after successful sign-in with Google
      naviagte('/main');
    } catch (error) {
      // Handle the error (e.g., display an error message)
      console.error(error);
    }
    
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
    <div>
      {userSignedIn ? (
        <div>
          <h2>Welcome, User!</h2>
          {userImage && <img src={userImage} alt="User" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h2>Sign In or Sign Up</h2>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignInWithEmail}>Sign In with Email</button>
          <button onClick={()=>{
            handleSignInWithGoogle();
            console.log(isUserSignedIn());  
          }}>Sign In with Google</button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
