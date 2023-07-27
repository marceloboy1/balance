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
        title: "Gastos",
        path: "/gastos",
        icon: <FaIcons.FaCartPlus />,
        cName:"nav-text",
        iName:"nav-icon",
    },
    {
        title: "Orçamento",
        path: "/orcamento",
        icon: <HiIcons.HiOutlineChartBar />,
        cName:"nav-text",
        iName:"nav-icon",
    },
    {
        title: "Carteira",
        path: "#",
        icon: <FaIcons.FaAddressCard />,
        cName:"nav-text",
        iName:"nav-icon",
    },

    {
        title: "Movimentação",
        path: "#",
        icon: <FaIcons.FaAddressCard />,
        cName:"nav-text",
        iName:"nav-icon",
    },
]