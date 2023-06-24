import "./Table.css"

import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import axios from "./api/axios";
import { Typography } from "@mui/material";


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'symbol', headerName: 'Symbol', width: 130 },
  { field: 'company', headerName: 'Company', width: 130 },
  {
    field: 'qtd',
    headerName: 'Qtd',
    type: 'number',
    width: 50,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 100,
  },  
  {
    field: 'total',
    headerName: 'Total',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    valueGetter: (params) =>
      `${params.row.qtd} + ${params.row.price}`,
  },
];

export default function DataTable() {
 
  const [rows, setRows] = useState("");

  useEffect(() => {
    const buscarDados = async () => {
      const resposta = await axios.get('/api');
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
        Carteira de ações
      </Typography>
    
      <div className='tableContainer'>
          {rows ? 
          <DataGrid 
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
          :
          <p>Carregando</p>}
      </div>
    </div>
  );
}