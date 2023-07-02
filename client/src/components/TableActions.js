import { Box, CircularProgress, Fab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {Check, Save} from '@mui/icons-material';
import { green } from '@mui/material/colors';
import axios from './api/axios';

const GASTOS_URL = '/gastos';
//descomentar depois para usar em outras tabelas
const TableActions = ({gasto, categoria, valor, handleClick}) => {

    //useState é usado para armazendar variáveis..
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();

        try {

            const response = await axios.post(GASTOS_URL,
                JSON.stringify({ gasto, categoria, valor }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // alterar aqui para usar cookies e credenciais depois dos testes*/
                    withCredentials: false
                }
            ).then((res) => {
                console.log("Success")
                handleClick();
                console.log(res)
            });
            
        } catch (err) {
        
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            console.log(errMsg)
        } 
    }

    return (  
        <Box
        sx={{
           m:1,
           position:'relative' 
        }}>
            {success ? (
                <Fab
                color='primary'
                sx={{
                    width:40,
                    height:40,
                    bgcolor:green[500],
                    '&hover':{bgcolor:green[700]},
                     }}
                    >
                    <Check />
                </Fab>
                ) : (
                <Fab
                    sx={{
                        width:40,
                        height:40,
                    }}

                    //descomentar depois para usar em outras tabelas
                    disabled={!gasto || !categoria || !valor || loading}
                    onClick={handleSubmit}
                    >
                    <Save />
                </Fab>
                )}

                { loading && (
                    <CircularProgress
                    size={52}
                    sx={{
                        color:green[500],
                        position:'absolute',
                        top:-6,
                        left:-23,
                        zIndex: 1,
                    }}
                    />
                )}
        </Box>
    )
};
 
export default TableActions;