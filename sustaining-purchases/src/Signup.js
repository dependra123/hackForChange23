// src/components/AuthComponent.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp, signIn, signInWithGoogle, signOutUser, isUserSignedIn, getUserImage } from './firebase'; // Adjust the path based on your project structure

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
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
      console.log(error);
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
          <h2>Sign Up</h2>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br/>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label style = {{visibility:(password.length>7)?"hidden":"visible"}}>password needs at least 8 characters</label>
          <br/>
          <label>re-enter Password:</label>
          <input type="password" value={confirmpassword} onChange={(e) => setconfirmPassword(e.target.value)} />
          <label style = {{visibility:(confirmpassword===password)?"hidden":"visible"}}>passwords don't match</label>
          <br/>
          <button onClick={handleSignUp} disabled = {!(confirmpassword===password)}>Sign Up with Email</button>
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
