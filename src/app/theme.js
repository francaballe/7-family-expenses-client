import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {      
      //main:'#00539C' // Set your primary color here
      main:'rgb(162,0,37)' // Set your primary color here
    },
    secondary: {
      //main: '#EEA47F', // Set your secondary color here
      main:'rgb(208,128,146)' // Set your primary color here      
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Set your desired font family
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          textAlign: "center",
          color: 'white'          
        },
      },
    },
  },
});

export default theme;
