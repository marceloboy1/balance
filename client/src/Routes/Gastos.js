import React from "react";
import Tabela from "../components/Table/Tabela";
import FileUpload from "../components/FileUpload";



function Gastos() {
    return (
        <div className="mainContainer">
            <div className="itemContainer">
                <Tabela />
            </div>
            <div className="itemContainer">
                <FileUpload />
            </div>
        </div>
    )
}

export default Gastos;