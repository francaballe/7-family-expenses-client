import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {      
      main:'#00539C' // Set your primary color here
    },
    secondary: {
      main: '#EEA47F', // Set your secondary color here
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Set your desired font family
  },
});

export default theme;
