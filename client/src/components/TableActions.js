import { Box, CircularProgress, Fab } from '@mui/material';
import React, { useState } from 'react';
import {Check, Save} from '@mui/icons-material';
import { green } from '@mui/material/colors';

const TableActions = ({params, rowId, setRowId}) => {

    const [loading, setLoading] = useState(true);
    const [success, setsuccess] = useState(false);

    const handleSubmit = async () => {

    };

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