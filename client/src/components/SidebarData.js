import React from "react";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as HiIcons from "react-icons/hi"

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName:"nav-text",
        iName:"nav-icon",
    },
    {
        title: "Products",
        path: "/products",
        icon: <FaIcons.FaCartPlus />,
        cName:"nav-text",
        iName:"nav-icon",
    },
    {
        title: "Reports",
        path: "/reports",
        icon: <HiIcons.HiOutlineChartBar />,
        cName:"nav-text",
        iName:"nav-icon",
    },
    {
        title: "Register",
        path: "/register",
        icon: <FaIcons.FaAddressCard />,
        cName:"nav-text",
        iName:"nav-icon",
    },
]