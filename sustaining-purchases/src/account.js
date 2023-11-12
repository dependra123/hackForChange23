import React, { useEffect } from "react";
import {getUserType, userId} from './firebase';
import { Outlet, useNavigate } from "react-router-dom";



export default function Account() {
    const navigate = useNavigate();
    
    useEffect(() => {
        getUserType()
            .then((userType) => {
                if (userType === "returner" || userType === "buyer" || userType === "restaurant") {
                    navigate(`/buyer/${userId}`);
                } else {
                    navigate(`/farmer/${userId}`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
      
    },[]);

    return(
 
        <>
  
        </>
        
    );
}