import React, { useState, useEffect, useMemo } from "react";
import axios from "./api/axios";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from "@mui/material";
import NewRowActions from "./NewRowActions.js";

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const usdPrice = {
  type: 'number',
  width: 130,
  valueFormatter: ({ value }) => currencyFormatter.format(value),
  cellClassName: 'font-tabular-nums',
};



export default function SimpleList() {
 
  const [rows, setRows] = useState("");

  const [rowId, setRowId] = useState(null)

  const columns = useMemo( () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'gasto', headerName: 'Gasto', width: 130, editable:true },
      { field: 'categoria', headerName: 'Categoria', width: 130, type:'singleSelect', valueOptions: ['Custo fixo', 'Prazeres', 'Conforto'], editable:true },
      {
        field: 'valor',
        headerName: 'Valor',
        
        width: 100,
        editable:true,
        ...usdPrice,
      },
      { field:'actions', 
        headerName:'Actions',  
        type:'actions', 
        renderCell: (params) => (
          <NewRowActions {...{params, rowId, setRowId}}/>
        )
      }
    ],
    [rowId]
  );


  useEffect(() => {
    const buscarDados = async () => {
      const resposta = await axios.get('/gastos');
      setRows(resposta.data);
    }
    buscarDados();
  
  }, []);


  return (
    <div className="itemContainer">
      <Typography
      variant='h3'
      component='h3'
      sx={{textAlign:'center',mt:3,mb:3}}>
        Controle de Gastos
    </Typography>
  
    <Box className='tableContainer' >
        <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onCellEditCommit={params=>setRowId(params.id)}
      />
    </Box>
  
  </div>
  );
}