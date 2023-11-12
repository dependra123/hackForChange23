// src/components/AuthComponent.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp, signIn, signInWithGoogle, signOutUser, isUserSignedIn, getUserImage, userId, getUserType } from './firebase'; // Adjust the path based on your project structure

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
  const navigate = useNavigate();
  const navToProfile = () => {
    if (getUserType() === "buyer") {
        navigate(`/buyer/${userId}`);
    } else {
        navigate(`/farmer/${userId}`);
    }
  };
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
      navToProfile();
    } catch (error) {
      // Handle the error (e.g., display an error message)
      console.error(error);
    }
  };

const handleSignInWithGoogle = async () => {
  try {
    const userCredential = await signInWithGoogle();
    const user = userCredential.user;
    
    if (!user) {
      throw new Error('No user');
    }
    
    if (!userId) {
      throw new Error('No user ID');
    }
    const userType = await getUserType(userId);
    if (userType) {
      navigate('/main');
    } else {
      navigate('/select-type');
      localStorage.setItem('userId', userId);
    }
  } catch (error) {
    navigate('/select-type');
    localStorage.setItem('userId', userId);
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
          <br/>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br/>
          <button onClick={handleSignInWithEmail}>Sign In with Email</button>
          <br/>
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
