import React, { useState } from 'react';
import axios from './api/axios';

import {Check, Save} from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { Box, CircularProgress, Fab  } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const GASTOS_URL = '/gastos';

//recebe os valores do formulário da tabela.
const EditActions = ({ newFormData, handleClick }) => {

    //useState é usado para armazendar variáveis..
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    const handleCancel = () => {
        alert("Cancel")
    }

    const handleSubmit = () => {
       
        console.log(newFormData)
        const response = axios.put(GASTOS_URL,
            JSON.stringify({ newFormData }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            }
        ).then((res) => {
            console.log(res.data)
        });

    }

    return (  

        <Box
        sx={{
           m:1,
           position:'relative' 
        }}>
            {/*Se o sucesso for verdadeiro, o ícone vira o check*/}
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

                    //Se todos os campos estiverem preenchidos, o icone de salvar fica ativo
                    disabled={!newFormData.gasto || !newFormData.categoria || !newFormData.valor || loading}
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

                <Fab
                    sx={{
                        width:40,
                        height:40,
                        marginLeft: 2, 
                        }}
                    >
                    <ClearIcon
                        onClick={handleCancel}
                    >
                    </ClearIcon>
                </Fab>
                
        </Box>

    )
};
 
export default EditActions;