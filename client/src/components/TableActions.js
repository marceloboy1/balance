import { Box, CircularProgress, Fab } from '@mui/material';
import React, { useState } from 'react';
import {Check, Save} from '@mui/icons-material';
import { green } from '@mui/material/colors';
import axios from './api/axios';

const TableActions = ({params, rowId, setRowId}) => {

    //useState é usado para armazendar variáveis..
    const [loading, setLoading] = useState(false);
    const [success, setsuccess] = useState(false);
    const [errMsg, seterrMsg] = useState('');

    const handleSubmit = async (e) => {
        // e.preventDefault();
              
        // try {
        //     const response = await axios.post(REGISTER_URL,
        //         JSON.stringify({ user, pwd }),
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             // alterar aqui para usar cookies e credenciais depois dos testes*/
        //             withCredentials: false
        //         }
        //     );
            
        // } catch (err) {
        
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 409) {
        //         setErrMsg('Username Taken');
        //     } else {
        //         setErrMsg('Registration Failed')
        //     }
        // }
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

                disabled={params.id != rowId || loading}
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