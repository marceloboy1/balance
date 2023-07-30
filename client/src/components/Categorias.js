
import React, { useState, useEffect } from "react";
import InputSlider from "../components/InputSlider";
import axios from "./api/axios";

// const loadedCat = {
//     "Gastos Fixos": 40,
//     "Conforto": 20,
//     "Prazeres": 10,
//     "Liberdade Financeira": 20,
//     "Metas": 5,
//     "Conhecimento": 5,
// }

let counter = 0

const getGategorias = async (user) => {
    
    const res = await axios.get('/orcamento',
    {
        params: {
            id: user.id,
            user: user.user,
            token: user.token
        }
    })
    return(res.data)
    ;
}

const Categorias = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    
    const [categorias, setCategorias] = useState();
    const [valores, setValores] = useState("");
    const [soma, setSoma] = useState("");
    const [pontos, setPontos] = useState("");  


    useEffect(() => {

        getGategorias(user).then((data) => {
            
            console.log("Dados do servidor")
            console.log(data);
            console.log(data.length);
            setCategorias(data)

            const newVal = Object.entries( data ).map((key) => {return(key[1].valor)})
            const newSoma = (newVal.reduce((partialSum, a) => partialSum + a, 0))
            const newPontos = (100 - soma)
            
            setValores(newVal)
            setSoma(newSoma)
            setPontos(newPontos)
        })
        
    },[])

    const handleChange = (text, value) => {

        //cria uma cópia das categorias e insere o novo valor ##USADO POIS A FUNÇÂO setCategorias DEMORA PARA ATUALIZAR
        console.log("Valor;", value)
        const newCat = categorias;
        let obj = categorias.find(item => item.categoria === text);
        obj.valor = value;
        //console.log("OBJ Valor;", obj.valor)

        const newVal = newCat.map(key => key.valor)
        const newSoma = newVal.reduce((partialSum, a) => partialSum + a, 0)
        // //Seta os novos valores aos states
        setCategorias(newCat);
        setValores(newVal)
        setSoma(newSoma)
        setPontos( 100 - newSoma )
    }

    return (
    <div className="itemContainer">
        <p>Pontos sobrando: {pontos}    Soma: {soma} </p>
        
        
        {categorias &&  Object.entries(categorias).map((key) => {
            if (key[1]){
            return <InputSlider key={key[1].id} text={key[1].categoria} valor={key[1].valor} handleChange={handleChange} />;}
        })}
    </div>
    )
}



export default Categorias;