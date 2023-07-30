
import React, { useState, useEffect } from "react";
import InputSlider from "../components/InputSlider";
import axios from "./api/axios";


const Categorias = () => {

    
    const getGategorias = async () => {
        const res = await axios.get('/orcamento',
        {
            params: {
                id: user.id,
                user: user.user,
                token: user.token
            }
        });
        //console.log(res.data)
       setCategorias(res.data)
    }



    const user = JSON.parse(localStorage.getItem("user"));
    const [categorias, setCategorias] = useState("");
    const [valores, setValores] = useState("");
    const [soma, setSoma] = useState("");
    const [pontos, setPontos] = useState("");
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState();

    useEffect(() => {
                
        getGategorias()
        setValores(Object.entries( categorias ).map((key) => {return(key[1])}))
        // setSoma(valores.reduce((partialSum, a) => partialSum + a, 0))
        // setPontos(100-soma)

        // const newValores = Object.entries( newCategoria ).map((key) => {return(key[1])})
        // const newSoma = newValores.reduce((partialSum, a) => partialSum + a, 0)
        // const newPontos = (100 - newSoma)
        
        console.log("##############")
        console.log("Categorias")
        console.log(categorias)
        console.log("Valores")
        console.log(valores)
        // console.log("Soma")
        // console.log(soma)
        // console.log("Pontos")
        //console.log(pontos)

        
    }, [])

    const handleChange = (text, value) => {

        //cria uma cópia das categorias e insere o novo valor ##USADO POIS A FUNÇÂO setCategorias DEMORA PARA ATUALIZAR
        // const newCat = categorias;
        // console.log(text)
        // newCat[text] = value;

        // // const newValores = Object.entries( newCat ).map((key) => {return(key[1])})
        // // const newSoma = newValores.reduce((partialSum, a) => partialSum + a, 0)

        // // //Seta os novos valores aos states
        // // setCategorias(newCat);
        // // setValores(newValores)
        // // setSoma(newSoma)
        // // setPontos( 100 - newSoma )
    }

    return (
            <div className="itemContainer">
                
                {/* <p> Total {soma} //// Pontos sobrando {pontos}</p> */}
                {Object.entries(categorias).map((categoria) => {
                    return <InputSlider key = {categoria[1].id }text={categoria[1].categoria} valor={categoria[1].valor} handleChange={handleChange} />;
                })}
            </div>
    )
}

export default Categorias;