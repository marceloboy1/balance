import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

import { Box, Fab } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const GASTOS_URL = '/gastos';



const ReadOnlyRow = ({row, handleEditClick, onDeleteSend}) => {
    
    const [showIcons, setShowIcons] = useState(false);

    const handleDelete = () => {
        
        const response = axios.delete("/gastos", 
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false,
                data: { row: row }
        })
        .then((res) => {
            onDeleteSend()
        });
    }

    return (
    <tr
    onMouseEnter={() => {setShowIcons(true)}}
    onMouseLeave={() => {setShowIcons(false)}}
    >
        <td>{row.id}</td>
        <td>{row.gasto}</td>
        <td>{row.categoria}</td>
        <td>{row.valor}</td>
        <td>{showIcons? 
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
                <Fab
                    sx={{
                        width:40,
                        height:40,
                        marginLeft: 2, 
                        }}
                    >
                    
                    <DeleteForeverIcon 
                        onClick={(event) => handleDelete(event, row)}
                    />
                </Fab>
            </Box>
            :            
            <Box
                sx={{
                    m:1,
                    position:'relative' ,
                    width:40,
                    height:40,
                }}>
            </Box>}
        </td>
    </tr>
    )
}

export default ReadOnlyRow;
