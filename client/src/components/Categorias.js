
import "./Categorias.css"
import React, { useState, useEffect } from "react";
import InputSlider from "../components/InputSlider";
import axios from "./api/axios";
import { Fab } from "@mui/material";
import { Save } from "@mui/icons-material";

const getGategorias = async (user) => {
    
    const res = await axios.get('/orcamento',
    {
        params: {
            id: user.id,
            user: user.user,
            token: user.token
        }
    })
    return(res.data);
}

const Categorias = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const [categorias, setCategorias] = useState();
    const [valores, setValores] = useState("");
    const [soma, setSoma] = useState("");
    const [pontos, setPontos] = useState(0);  
    const [edited, setEdited] = useState(false);
  
    useEffect(() => {

        getGategorias(user).then((data) => {
            
            setCategorias(data)

            const newVal = Object.entries( data ).map((key) => {return(key[1].valor)})
            const newSoma = (newVal.reduce((partialSum, a) => partialSum + a, 0))
            const newPontos = (100 - newSoma)
            
            setValores(newVal)
            setSoma(newSoma)
            setPontos(newPontos)
            
        })
        
    },[])

    const handleChange = (text, value) => {

        //cria uma cópia das categorias e insere o novo valor ##USADO POIS A FUNÇÂO setCategorias DEMORA PARA ATUALIZAR
        const newCat = categorias;
        let obj = categorias.find(item => item.categoria === text);
        obj.valor = value;
   
        const newVal = newCat.map(key => key.valor)
        const newSoma = newVal.reduce((partialSum, a) => partialSum + a, 0)
   
        // //Seta os novos valores aos states
        setCategorias(newCat);
        setValores(newVal)
        setSoma(newSoma)
        //setPontos( 100 - newSoma )
        setEdited(true)
    }

    const handleSave = () => {
        
        const response = axios.put("/orcamento",
            JSON.stringify({ categorias, user }),
            {
                headers: { 'Content-Type': 'application/json' },
                // alterar aqui para usar cookies e credenciais depois dos testes*/
                withCredentials: false
            }
            );
            setEdited(false)
        }
    

    return (
    <div className="itemContainer">
        <p>Organize seus gastos de acordo com a porcentagem do seu salário que pretende gastar com cada categoria.</p>
        <div className="catButtons">
            <p style={{ color: soma > 100 ? "red" : "antiquewhite"}}>Total utilizado: {soma}%</p>
        </div>
            <p className="message" style={{display: soma > 100 ? "flex" : "none"}}>Você não pode utilizar mais que 100% do seu salário</p>

        {categorias &&  Object.entries(categorias).map((key) => {
            if (key[1]){
            return <InputSlider key={key[1].id} text={key[1].categoria} valor={key[1].valor} handleChange={handleChange} />;}
        })}

        <div className="catButtons">
            <Fab
                sx={{
                    width:40,
                    height:40,
                }}
                disabled={!edited || (soma > 100)}
                onClick={handleSave}
                >
                <Save />
            </Fab>
        </div>
    </div>
    )
}

export default Categorias;