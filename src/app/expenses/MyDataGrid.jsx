import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import theme from "../theme";
import axios from "axios";
import MonthContext from './MonthContext';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';


const columns = [
  { field: 'user_name', headerName: 'User', width: 90, /* headerAlign: 'center' */ },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: false,
    /* headerAlign: 'center' */
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 150,
    editable: false,
    /* headerAlign: 'center' */
  },
  {
    field: 'expense_date',
    headerName: 'Date',
    //type: 'date',
    width: 110,
    editable: false,
    /* headerAlign: 'center' */
  },
  {
    field: 'due_date',
    headerName: 'Due Date',
    //description: 'This column has a value getter and is not sortable.',
    //sortable: false,
    width: 160,
    /* valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`, */
    /* headerAlign: 'center' */
  },
  {
    field: 'proof_url',
    headerName: 'Attachment',
    width: 100,
    editable: false,
    /* headerAlign: 'center' */
  }
];


const MyDataGrid = ({token}) => {

//Some Local States
const [gridData,setGridData] = React.useState(null);
const { selectedMonth } = React.useContext(MonthContext);
const [myCurrentMonth, setMyCurrentMonth] = React.useState(null);
const [disabledNewExpense,setDisabledNewExpense] = React.useState(false);
const router = useRouter();


React.useEffect(() => {
  if (selectedMonth){    
    const dateObj = new Date(selectedMonth); // Convert selectedMonth to a Date object  
    const monthNumber = dateObj.getMonth(); // Get the month number (0-indexed)
    setMyCurrentMonth(monthNumber)
    //console.log("Month Number:", monthNumber);  
    if (dayjs().month()!==monthNumber) setDisabledNewExpense(true)    
    else setDisabledNewExpense(false)
  }   
},[selectedMonth]);


React.useEffect(()=>{
  getData();
},[token])



  async function getData(){        
    const headers = {
      Authorization: `Bearer ${token}`
    };
    if (token.length){
      const response = await axios.get("http://localhost/api/expenses",{headers})        
      setGridData(response.data)
    }    
  }
  
  
  let rows = []  
  if (gridData && gridData.length){    
    //months start with 0 for junuary (and 11 for december)
    const filteredByMonthData = gridData.filter(oneData => new Date(oneData.expense_date).getMonth() === myCurrentMonth);
    //console.log("filtered data:", filteredByMonthData)
    rows = [...filteredByMonthData]
  }      

  //SOME HANDLERS
  const handleButtonClick = () => {    
    router.push('/expenses/newexpense') 
  };    


  return (
    <Box sx={{ height: 'auto', width: '100%', backgroundColor: theme.palette.primary.light}}>
      <DataGrid theme={theme}        
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

      <Box py='10px' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            Total: {rows.reduce((sum, row) => sum + parseFloat(row.amount), 0)}
          </div>
      </Box>

      <Box py='10px' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button disabled={disabledNewExpense} color='secondary' variant="contained" startIcon={<MonetizationOnOutlinedIcon/>} onClick={handleButtonClick}>New Expense</Button>          
      </Box>      
    </Box>
  );
};

export default MyDataGrid;
