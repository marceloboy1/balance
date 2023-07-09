import React from 'react';
import { Box, Fab } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';



function ReadOnlyRow({row, handleEditClick}) {
    return (
    <tr>
        <td>{row.id}</td>
        <td>{row.gasto}</td>
        <td>{row.categoria}</td>
        <td>{row.valor}</td>
        <td>
            {/* <button type="button" 
            onClick={(event) => handleEditClick(event, row)}>Edit</button> */}
            <Box
                sx={{
                    m:1,
                    position:'relative' 
                }}>

                <Fab
                    sx={{
                        width:40,
                        height:40,
                    }}

                    >
                    <EditIcon 
                        onClick={(event) => handleEditClick(event, row)}
                    />
                </Fab>
            </Box>
        </td>
    </tr>
    )
}

export default ReadOnlyRow;
