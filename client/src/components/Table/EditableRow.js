import React from 'react';
import EditActions from './EditActions';

function EditableRow({ editFormData, handleEditFormChange, onEditSend }) {
    
    const handleClick = () => {
        onEditSend();
    }

    return (
    <tr>
        <td>
            <input 
                className="tableInput" 
                onChange={handleEditFormChange} 
                type="text" name="gasto" 
                required="required" 
                placeholder="Gasto"
                value={editFormData.gasto} 
                />
        </td>
        
        <td>
            <input 
            className="tableInput" 
            onChange={handleEditFormChange} 
            type="text" name="categoria" 
            required="required" 
            placeholder="Categoria"
            value={editFormData.categoria}
            />
        </td>
        
        <td>
            <input 
            className="tableInput" 
            onChange={handleEditFormChange} 
            type="text" name="valor" 
            required="required" 
            placeholder="Valor"
            value={editFormData.valor}
        />
        </td>
        <td>
            <EditActions newFormData={editFormData} handleClick={handleClick} />
        </td>
    </tr>
    )
}

export default EditableRow;
