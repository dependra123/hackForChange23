import React from "react";
import { motion } from "framer-motion"

import { getUserImage, isUserSignedIn } from "./firebase";

import { Outlet,Link, useNavigate } from "react-router-dom";

export default function Nav(){
    const userSignedIn = isUserSignedIn();
    const userImage = getUserImage();
    const naviagte = useNavigate();
  const handleButtonClick = () => {
    // Navigate to the desired route when the button is clicked
    naviagte('/signin');
  };
return(
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <div className="nav">
            <motion.span className="material-symbols-outlined menu" > menu </motion.span>
            <button>signout</button>
            <span className="alignEnd">
            {(userSignedIn) ? (
                <>
                <motion.img src={userImage} alt="User" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                </>
            ):(<>
                <motion.button style={{background:"#c5d5ea ", border:'none', cursor:'pointer', borderRadius:'27px', height:'30px', width:'90px', margin:'none', fontWeight:'bold'}} onClick={handleButtonClick}>Sign In</motion.button>
            </>)
            }
            </span>
            
    
        </div>
        <Outlet/>
     </>
)
      
}
