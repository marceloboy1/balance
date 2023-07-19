import "./Tabela.css"
import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from "./api/axios";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import NewRow from "./NewRow";

function Tabela() {

    const [rowId, setRowId] = useState(null)
    const [rows, setRows] = useState("");
    const [loading, setLoading] = useState(true);

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
        
    //state que guarda o ID da linha clicada para edição
    const [editRowId, setEditRowId] = useState(null);

    useEffect(() => {
        buscarDados();
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

    const handleDelete = (event, row) => {
        alert("Delete")
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
                            <Fragment>
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
            
        </div>
     );
}

export default Tabela


