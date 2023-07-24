import React, { useState, useEffect } from "react";
import InputSlider from "../components/InputSlider";


const loadedCat = {
    "Gastos Fixos": 40,
    "Conforto": 20,
    "Prazeres": 10,
    "Liberdade Financeira": 20,
    "Metas": 5,
    "Conhecimento": 5,
}

function Orcamento() {
   
    const [categorias, setCategorias] = useState(loadedCat);
    const [valores, setValores] = useState(Object.entries( categorias).map((key) => {return(key[1])} ));
    const [soma, setSoma] = useState(valores.reduce((partialSum, a) => partialSum + a, 0));
    const [pontos, setPontos] = useState(100 - soma);  

    const handleChange = (text, value) => {

        //cria uma cópia das categorias e insere o novo valor ##USADO POIS A FUNÇÂO setCategorias DEMORA PARA ATUALIZAR
        const newCat = categorias;
        newCat[text] = value;

        const newValores = Object.entries( newCat ).map((key) => {return(key[1])})
        const newSoma = newValores.reduce((partialSum, a) => partialSum + a, 0)

        //Seta os novos valores aos states
        setCategorias(newCat);
        setValores(newValores)
        setSoma(newSoma)
        setPontos( 100 - newSoma )
    }

    return (
    <div className="itemContainer">
        <p>Pontos sobrando: {pontos}    Soma: {soma} </p>
        
        {Object.entries(categorias).map((key) => {
            return <InputSlider text={key[0]} valor={key[1]} handleChange={handleChange} />;
        })}
    </div>
    )
}

export default Orcamento;