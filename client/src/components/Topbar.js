import "./Topbar.css"
import React from "react";
import { useNavigate  } from "react-router-dom"


const Topbar = () => {

    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    const isAuthenticated = !!user

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        console.log("Click")
    }

    return ( 
        
        <div className="topbar">
            
                {isAuthenticated? 
                    <div className="item" onClick={handleLogout}>
                        <p>Log Out</p>
                    </div>
                    :
                    <div className="topMenu">
                        <div className="item" onClick={() => {navigate('/login');}}>
                            <p>Log In</p>
                        </div>
                        <div className="item" onClick={() => {navigate('/register');}}>
                        <p>Register</p>
                        </div>
                    </div>
                
                }
            
        </div>
     );
}
 
export default Topbar;