import React from 'react';

function ReadOnlyRow({row, handleEditClick}) {
    return (
    <tr>
        <td>{row.id}</td>
        <td>{row.gasto}</td>
        <td>{row.categoria}</td>
        <td>{row.valor}</td>
        <td>
            <button type="button" 
            onClick={(event) => handleEditClick(event, row)}>Edit</button>
        </td>
    </tr>
    )
}

export default ReadOnlyRow;
