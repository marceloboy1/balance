import "./Tabela.css"
import React, { useEffect, useRef, useState } from 'react';
import axios from "./api/axios";
import TableActions from "./TableActions";

function Tabela() {

    const [rowId, setRowId] = useState(null)
    const [rows, setRows] = useState("");
    const [loading, setLoading] = useState(true);
    
    const [gasto, setGasto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [valor, setValor] = useState('');

    const gastoRef = useRef(null);
    const categoriaRef = useRef(null);
    const valorRef = useRef(null);

    useEffect(() => {
            buscarDados();
    }, []);

    const buscarDados = async () => {
        const resposta = await axios.get('/gastos');
        setLoading(false);
        setRows(resposta.data);
        }

    const handleClick = () => {
        console.log("Clicked")
        gastoRef.current.value = '';
        categoriaRef.current.value = '';
        valorRef.current.value = '';
        setGasto('');
        setCategoria('');
        setValor('');
        buscarDados();
    }

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
                    <tr>
                            <td>
                                ID
                            </td>
                            
                            <td>
                                <input 
                                    className="tableInput" 
                                    onChange={(e) => setGasto(e.target.value)} 
                                    type="text" name="gasto" 
                                    required="required" 
                                    placeholder="Gasto" 
                                    ref={gastoRef}
                                    />
                            </td>
                            
                            <td>
                                <input 
                                className="tableInput" 
                                onChange={(e) => setCategoria(e.target.value)} 
                                type="text" name="categoria" 
                                required="required" 
                                placeholder="Categoria"
                                ref={categoriaRef}
                                />
                            </td>
                            
                            <td>
                                <input 
                                className="tableInput" 
                                onChange={(e) => setValor(e.target.value)} 
                                type="text" name="valor" 
                                required="required" 
                                placeholder="Valor"
                                ref={valorRef}
                            />
                            </td>
                            <td>
                                <TableActions gasto={gasto} categoria={categoria} valor={valor} handleClick={handleClick}/>
                            </td>
                            
                    </tr>
                    
                </tbody>
            </table>
        </div>
     );
}

export default Tabela


