import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import theme from "../theme";

const columns = [
  { field: 'User', headerName: 'User', width: 90 },
  {
    field: 'Description',
    headerName: 'Description',
    width: 250,
    editable: false,
  },
  {
    field: 'Amount',
    headerName: 'Amount',
    type: 'number',
    width: 150,
    editable: false,
  },
  {
    field: 'Date',
    headerName: 'Date',
    //type: 'date',
    width: 110,
    editable: false,
  },
  {
    field: 'DueDate',
    headerName: 'Due Date',
    //description: 'This column has a value getter and is not sortable.',
    //sortable: false,
    width: 160,
    /* valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`, */
  },
  {
    field: 'Atachment',
    headerName: 'Atachment',
    width: 100,
    editable: false,
  }
];

const rows = [
  { id: 1, User: 'Gaby',Description: 'Lili', Amount: 10056, Date: '11/06/2023' },
  { id: 2, User: 'Fran',Description: 'Asado', Amount: 5672, age: 42 },
  { id: 3, User: 'Fran',Description: 'Supermercado', Amount: 19232, age: 45 },
  { id: 4, User: 'Gaby',Description: 'Jardín', Amount: 126900, age: 16 },
  { id: 5, User: 'Fran',Description: 'Farmacia', Amount: 4598, age: null },
  { id: 6, User: 'Fran',Description: 'Verdulería', Amount: 10, age: 150 },
  { id: 7, User: 'Fran',Description: 'Regalo Cumple', Amount: 5602, age: 44 },
  { id: 8, User: 'Fran', Description: 'Lili', Amount: 4056, age: 36 },
  { id: 9, User: 'Gaby',Description: 'Internet', Amount: 4764, age: 65 },
];

const MyDataGrid = () => {
  const [buttonText, setButtonText] = React.useState('New Expense');

  const handleButtonClick = () => {
    //setButtonText('');
  };

  return (
    <Box sx={{ height: 'auto', width: '100%', backgroundColor: theme.palette.primary.light}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        //checkboxSelection
        disableRowSelectionOnClick
        //disableSelectionOnClick
      >
        
      </DataGrid>
      <Box py='10px' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button color='secondary' variant="contained" startIcon={<MonetizationOnOutlinedIcon/>} onClick={handleButtonClick}>{buttonText}</Button>          
      </Box>      
    </Box>
  );
};

export default MyDataGrid;
