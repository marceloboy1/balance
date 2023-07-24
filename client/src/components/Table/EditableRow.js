import React from 'react';
import EditActions from './EditActions';

function EditableRow({ editFormData, handleEditFormChange, onEditSend }) {
    
    const handleClick = () => {
        onEditSend();
    }

    return (
    <tr>
        <td>
            {editFormData.id}
        </td>
        
        <td>
            <input 
                className="tableInput" 
                onChange={handleEditFormChange} 
                type="text" name="gasto" 
                required="required" 
                placeholder="Gasto"
                value={editFormData.gasto} 
                //ref={gastoRef}
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
            //ref={categoriaRef}
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
            //ref={valorRef}
        />
        </td>
        <td>
            <EditActions newFormData={editFormData} handleClick={handleClick} />
            {/* Ao clicar no icone ele envia os dados para o componente Actions para que sejam enviados para o servidor */}
            {/* <TableActions gasto={gasto} categoria={categoria} valor={valor} handleClick={handleClick}/> */}
        </td>
    </tr>
    )
}

export default EditableRow;
