import React, { useState } from 'react';
import axios from './api/axios';

import { Box, Fab } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const GASTOS_URL = '/gastos';


const ReadOnlyRow = ({row, handleEditClick}) => {
    
    const handleDelete = () => {
       
        console.log(row)
        const response = axios.delete("/gastos", 
            JSON.stringify({row}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            }
        ).then((res) => {
            console.log(res.data)
        });
    }

    return (
    <tr>
        <td>{row.id}</td>
        <td>{row.gasto}</td>
        <td>{row.categoria}</td>
        <td>{row.valor}</td>
        <td>
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
        </td>
    </tr>
    )
}

export default ReadOnlyRow;
