import React from "react";
import Tabela from "../components/Table/Tabela";
import Categorias from "../components/Categorias";

function Home() {
    return (
        <div className="mainContainer">
            <div className="itemContainer">
                <Tabela />
            </div>
            <div className="itemContainer">
                <Categorias />
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