import "./Tabela.css"
import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from "./api/axios";
import TableActions from "./TableActions";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import NewRow from "./NewRow";

function Tabela() {

    const [rowId, setRowId] = useState(null)
    const [rows, setRows] = useState("");
    const [loading, setLoading] = useState(true);
    
    //Salva os dados do formulário
    const [gasto, setGasto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [valor, setValor] = useState('');

    //Salva os dados do formulário editado
    const [editFormData, setEditFormData] = useState({
        gasto: "",
        categoria: "",
        valor: "",
    });

    
    //state que guarda o ID da linha clicada para edição
    const [editRowId, setEditRowId] = useState(null);

    //usado para apagar os campos preenchidos após o envio dos dados
    const gastoRef = useRef(null);
    const categoriaRef = useRef(null);
    const valorRef = useRef(null);

    useEffect(() => {
            buscarDados();
    }, []);

    //faz a requisição para o backend
    const buscarDados = async () => {
        const resposta = await axios.get('/gastos');
        setLoading(false);
        setRows(resposta.data);
    }

    //limpa as variáveis e os campos de input
    //buscarDados atualiza a tabela com os novos dados
    const handleClick = () => {
        gastoRef.current.value = '';
        categoriaRef.current.value = '';
        valorRef.current.value = '';
        setGasto('');
        setCategoria('');
        setValor('');
        buscarDados();
    }
    
    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        console.log("asdasdas")
        const editedRow = {
            id: editRowId,
            gasto: editFormData.gasto,
            categoria: editFormData.categoria,
            valor: editFormData.valor,
        };

        const newRows = [...rows];

        const index = rows.findIndex((row) => row.id === editRowId);

        newRows[index] = editedRow;

        setRows(newRows);
        setRowId(null);
    }

    const handleEditClick = (event, row) => {
        event.preventDefault();
        setEditRowId(row.id);

        const formValues = {
            gasto: row.gasto,
            categoria: row.categoria,
            valor: row.valor,
        }

        setEditFormData(formValues)
    }

    return ( 
        <div className="itemContainer">
            <form className="tableForm" onSubmit={handleEditFormSubmit}>
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
                                    /> : 
                                    <ReadOnlyRow 
                                        row={row} 
                                        handleEditClick={handleEditClick}
                                    />}
                            </Fragment>
                        ))}
                        <NewRow                                         
                            editFormData={editFormData} 
                            handleEditFormChange={handleEditFormChange}
                        />
                    </tbody>
                </table>
            </form>
        </div>
     );
}

export default Tabela


