import "./Topbar.css"
import React from "react";
import { useNavigate  } from "react-router-dom"


const Topbar = () => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const isAuthenticated = !!user
    
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    return ( 
        <div className="topbar">
            {isAuthenticated? 
            <div>
                <p>Olá {user.user}, seja bem vindo!</p>
            </div>
            :<p></p>}
            {isAuthenticated? 
                <div className="topMenu">

                    <div className="clickableItem" onClick={handleLogout}>
                        <p>Log Out</p>
                    </div>
                </div>
                :
                <div className="topMenu">
                    <div className="clickableItem" onClick={() => {navigate('/login');}}>
                        <p>Log In</p>
                    </div>
                    <div className="clickableItem" onClick={() => {navigate('/register');}}>
                        <p>Register</p>
                    </div>
                </div>
            
                }
        </div>
     );
}
 
export default Topbar;