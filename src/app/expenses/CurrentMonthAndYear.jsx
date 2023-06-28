import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import * as React from 'react';
import MonthContext from './MonthContext';


export default function CurrentMonthAndYear() {  
  const { selectedMonth, setSelectedMonth } = React.useContext(MonthContext);

  //HANDLERS
  function monthChangeHandler(newValue){
    //console.log("soy el nuevo valor papa:",newValue)   
    setSelectedMonth(newValue)
  }

  React.useEffect(()=>{    
    setSelectedMonth(dayjs())
  },[])
  

  return (    
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <DemoContainer components={['DatePicker']}>      
            <DatePicker value={selectedMonth /* ? selectedMonth : dayjs() */} onChange={(newValue) => monthChangeHandler(newValue)} 
            views={['month']}/>      
        </DemoContainer>
      </LocalizationProvider>        
  );
}