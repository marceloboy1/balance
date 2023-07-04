import React from 'react';
import TableActions from './TableActions';

function NewRow({ handleEditFormChange }) {
    return (
    <tr>
        <td>
            ID
        </td>
        
        <td>
            <input 
                className="tableInput" 
                onChange={handleEditFormChange} 
                type="text" name="gasto" 
                required="required" 
                placeholder="Gasto"
                //value={editFormData.gasto} 
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
            //value={editFormData.categoria}
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
            //value={editFormData.valor}
            //ref={valorRef}
        />
        </td>
        <td>
            <button type="submit">Save</button>
            {/* Ao clicar no icone ele envia os dados para o componente Actions para que sejam enviados para o servidor */}
            {/* <TableActions gasto={gasto} categoria={categoria} valor={valor} handleClick={handleClick}/> */}
        </td>
    </tr>
    )
}

export default NewRow;
