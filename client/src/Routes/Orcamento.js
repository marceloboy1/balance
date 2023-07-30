import React, { useState, useEffect } from "react";
import InputSlider from "../components/InputSlider";
import Categorias from "../components/Categorias";


const loadedCat = {
    "Gastos Fixos": 40,
    "Conforto": 20,
    "Prazeres": 10,
    "Liberdade Financeira": 20,
    "Metas": 5,
    "Conhecimento": 5,
}

function Orcamento() {
   
    
    return (
        <div className="mainContainer">
            <Categorias />
        </div>
    )
}

export default Orcamento;