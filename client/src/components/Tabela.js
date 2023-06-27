import "./Tabela.css"
import React, { useEffect, useState } from 'react';
import axios from "./api/axios";

function Tabela() {

    const [rows, setRows] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const buscarDados = async () => {
        const resposta = await axios.get('/gastos');
        setLoading(false)
        setRows(resposta.data);
        }

        buscarDados();
        
    }, []);



    return ( 
        <div className="itemContainer">
            
            <table className="tabela">
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Gasto </th>
                        <th> Categoria </th>
                        <th> Valor </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <h3> Loading data... </h3> : rows.map((row) => (            
                        <tr>
                            <td>{row.id}</td>
                            <td>{row.gasto}</td>
                            <td>{row.categoria}</td>
                            <td>{row.valor}</td>
                            <td><a href="#">Edit</a> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}

export default Tabela


