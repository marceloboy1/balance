import React, { useRef } from 'react';
import NewRowActions from './NewRowActions';

function NewRow({ newFormData, handleNewFormChange, onNewSend }) {

    //usado para apagar os campos preenchidos após o envio dos dados
    const gastoRef = useRef(null);
    const categoriaRef = useRef(null);
    const valorRef = useRef(null);

    const handleClick = () => {
        gastoRef.current.value = '';
        categoriaRef.current.value = '';
        valorRef.current.value = '';
        onNewSend();
    }

    return (
    <tr>
     
        <td>
            <input 
                className="tableInput" 
                onChange={handleNewFormChange} 
                type="text" name="gasto" 
                required="required" 
                placeholder="Gasto"
                //value={newFormData.gasto} 
                ref={gastoRef}
                />
        </td>
        
        <td>
            <input 
            className="tableInput" 
            onChange={handleNewFormChange} 
            type="text" name="categoria" 
            required="required" 
            placeholder="Categoria"
            //value={newFormData.categoria}
            ref={categoriaRef}
            />
        </td>
        
        <td>
            <input 
            className="tableInput" 
            onChange={handleNewFormChange} 
            type="text" name="valor" 
            required="required" 
            placeholder="Valor"
            //value={newFormData.valor}
            ref={valorRef}
        />
        </td>
        <td>
            
            {/* Ao clicar no icone ele envia os dados para o componente Actions para que sejam enviados para o servidor */}
            <NewRowActions newFormData={newFormData} handleClick={handleClick} />
        </td>
    </tr>
    )
}

export default NewRow;
