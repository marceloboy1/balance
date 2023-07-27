import "./Sidebar.css"

import React, {useState} from "react";
import { Link } from "react-router-dom";
import {SidebarData} from "./SidebarData"
import "../App.css"

function Sidebar(){
    return(
        <div className="navbar">
            <ul className="nav-menu-items">
                {SidebarData.map((item,index) => {
                    return(
                        <li key={index} className="nav-icon">
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Sidebar;