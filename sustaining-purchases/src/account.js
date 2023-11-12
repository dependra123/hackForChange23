import React, { useEffect } from "react";
import {getUserType, userId} from './firebase';
import { Outlet, useNavigate } from "react-router-dom";



export default function Account() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (getUserType() === "buyer") {
            navigate(`/buyer/${userId}`);
        } else {
            navigate(`/farmer/${userId}`);
        }
    });

    return(
 
        <>
  
        </>
        
    );
}