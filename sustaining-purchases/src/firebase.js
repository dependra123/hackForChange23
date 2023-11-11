import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8rrxeWgKLvPYO5AgAshRoEXPH74GjVTc",
    authDomain: "suspur23.firebaseapp.com",
    projectId: "suspur23",
    storageBucket: "suspur23.appspot.com",
    messagingSenderId: "1055040657469",
    appId: "1:1055040657469:web:790f8f19c0bc9d285bf254",
    measurementId: "G-C34K5L349H"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// Function to handle user sign-up
export const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign up error:", errorCode, errorMessage);
      throw error;
    }
  };
  
  // Function to handle user sign-in
  export const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign in error:", errorCode, errorMessage);
      throw error;
    }
  };
  
  // Function to handle Google sign-in
  export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in with Google:", user);
      
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Google sign-in error:", errorCode, errorMessage);
      throw error;
    }
  };
  
  // Function to handle user sign-out
  export const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };
export const isUserSignedIn = () => {
    const user = auth.currentUser;
    return !!user; // Returns true if the user is signed in, false otherwise
  };
  
  // Function to get the user's image (you can modify this to return other user data)
export const getUserImage = () => {
    const user = auth.currentUser;
    if (user) {
      // You may have stored the user's image URL in the user object or in the database
      // For demonstration purposes, let's assume there's an 'image' property in the user object
      return user.photoURL || 'default_image_url.jpg'; // Replace 'default_image_url.jpg' with your default image URL
    } else {
      return null; // Return null if the user is not signed in
    }
  };