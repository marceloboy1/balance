import { Box, CircularProgress, Fab  } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from 'react';
import {Check, Save} from '@mui/icons-material';
import { green } from '@mui/material/colors';
import axios from '../api/axios';

const GASTOS_URL = '/gastos';

//recebe os valores do formulário da tabela.
const EditActions = ({ newFormData, handleClick }) => {

    //useState é usado para armazendar variáveis..
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleCancel = () => {
        handleClick();
    }

    const handleSubmit = (e) => {
        
        //previne o comportamento padrão    
        e.preventDefault();
        
        setLoading(true)

        //tenta fazer a requisição para o servidor, e após receber a resposta
        //executa a função handleClick do componente Tabela
        const response = axios.put(GASTOS_URL,
            JSON.stringify({ newFormData }),
            {
                headers: { 'Content-Type': 'application/json' },
                // alterar aqui para usar cookies e credenciais depois dos testes*/
                withCredentials: false
            }
        ).then((res) => {
            handleClick();
   
        }).finally(() => {
            setLoading(false)
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