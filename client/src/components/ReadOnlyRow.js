import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from './api/axios';
const GASTOS_URL = '/gastos';


const ReadOnlyRow = ({row, handleEditClick}) => {
    
    const [errMsg, setErrMsg] = useState('');
    
    const handleDelete = (e, rowToDelete) => {
        
        //previne o comportamento padrão    
        e.preventDefault();
        
        try {
            
            console.log(JSON.stringify({rowToDelete}))
            const response = axios.delete(GASTOS_URL,
                JSON.stringify( {rowToDelete} ),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // alterar aqui para usar cookies e credenciais depois dos testes*/
                    withCredentials: false
                }
            ).then((res) => {
                console.log(res.data)
                //handleClick();
                //setLoading(false)
            });
           
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                console.log(errMsg)
            }
            
        } 
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
