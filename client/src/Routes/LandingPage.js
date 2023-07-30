import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('user');
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/Home")
        }
    }, []);

    return (
        <div>
            <h1>Balance: o caminho para uma vida financeira saudável!</h1>
        </div>
    )

}

export default LandingPage;