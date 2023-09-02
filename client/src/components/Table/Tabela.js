import "./Tabela.css"
import React, { Fragment, useEffect, useState } from 'react';
import axios from "../api/axios";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import NewRow from "./NewRow";

function Tabela() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [rows, setRows] = useState("");
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState("");
    
    //state que guarda o ID da linha clicada para edição
    const [editRowId, setEditRowId] = useState(null);

    //Salva os dados do formulário editado
    const [editFormData, setEditFormData] = useState({
        id: "",
        gasto: "",
        categoria: "",
        valor: "",
    });

    //Salva os dados do novo fomrulário
    const [newFormData, setNewFormData] = useState({
        gasto: "",
        categoria: "",
        valor: "",
    });

    useEffect(() => {
        buscarDados();
        getGategorias(user).then((data) => {
            const cat = Object.entries( data ).map((key) => {return(key[1].categoria)})
            setCategorias(cat)
        })
    }, []);

    //limpa as variáveis e os campos de input
    //buscarDados atualiza a tabela com os novos dados
    const onNewSend = () => {

        //reseta o resultado de formulario da nova linha
        setNewFormData({       
            gasto: "",
            categoria: "",
            valor: "",})
        buscarDados();
    }

    const onEditSend = () => {
        //reseta o resultado de formulario da nova linha
        setEditFormData({ 
            id: "",      
            gasto: "",
            categoria: "",
            valor: "",})
        buscarDados();
        setEditRowId(null);
    }

    const onDeleteSend = () => {
        buscarDados();
    }

    //faz a requisição para o backend
    const buscarDados = async () => {
        const res = await axios.get('/gastos');
        setLoading(false);
        setRows(res.data);
    }

        //faz a requisição para o backend
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

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newEditableForm = {...editFormData};
        newEditableForm[fieldName] = fieldValue;
        setEditFormData(newEditableForm);
    }

    const handleNewFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const formData = {...newFormData };
        formData[fieldName] = fieldValue;

        setNewFormData(formData);
    }

    const handleEditClick = (event, row) => {
        event.preventDefault();
        setEditRowId(row.id);

        const formValues = {
            id: row.id,
            gasto: row.gasto,
            categoria: row.categoria,
            valor: row.valor,
        }

        setEditFormData(formValues)
    }

    return ( 
        <table className="tabela">
            <thead>
                <tr>
                    <th> Gasto </th>
                    <th> Categoria </th>
                    <th> Valor </th>
                    <th> Ação </th>
                </tr>
            </thead>
            <tbody>
                {loading ? <h3> Loading data... </h3> : rows.map((row) => (       
                    <Fragment key={row.id}>                           
                        {editRowId === row.id ? 
                            <EditableRow 
                                editFormData={editFormData} 
                                handleEditFormChange={handleEditFormChange} 
                                onEditSend={onEditSend}
                            /> : 
                            <ReadOnlyRow
                                row={row} 
                                handleEditClick={handleEditClick}
                                onDeleteSend={onDeleteSend}
                                
                            />}
                    </Fragment>
                ))}
                <NewRow                                         
                    newFormData={newFormData} 
                    handleNewFormChange={handleNewFormChange}
                    onNewSend={onNewSend}
                />
            </tbody>
        </table>
     );
}

export default Tabela


