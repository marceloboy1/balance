import "./Navbar.css"

import React, {useState} from "react";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { Link } from "react-router-dom";
import {SidebarData} from "./SidebarData"
import "../App.css"
import { IconContext } from "react-icons";

function Navbar(){
    
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    
    return(
        <>
            <IconContext.Provider value={{ color: "undefined"}}>

                <div className={sidebar ? "navbarFixed" : "navbarFixed active"} onMouseEnter={showSidebar}>
                        <ul className="nav-menu-items">
                            {SidebarData.map((item,index) => {
                                return(
                                    <li key={index} className="nav-icon">
                                        <Link to={item.path}>
                                            {item.icon}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                </div>

                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onMouseLeave={showSidebar}>
                        {SidebarData.map((item,index) => {
                            return(
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                


            </IconContext.Provider>
        </>
    )
}

export default Navbar;