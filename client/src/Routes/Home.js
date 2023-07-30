import React from "react";
import Tabela from "../components/Table/Tabela";

function Home() {
    return (
        <div className="mainContainer">
            <div className="itemContainer">
                <Tabela />
            </div>
            <div className="itemContainer">
                <Tabela />
            </div>
            <div className="itemContainer">
                <Tabela />
            </div>
            <div className="itemContainer">
                <Tabela />
            </div>


        </div>
    )
}

export default Home;