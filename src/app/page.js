"use client";
import Box from '@mui/material/Box';
import Head from 'next/head';
import CurrentMonthAndYear from './components/CurrentMonthAndYear';
import MyDataGrid from './components/MyDataGrid';
import styles from './page.module.css';
import theme from "./theme";
import { ThemeProvider } from '@mui/material/styles';


export default function Home() {
  
  //Handlers
  const handleSearch = (searchValue) => {
    console.log('Search value:', searchValue);
  };


  return (
    <ThemeProvider theme={theme}>
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: theme.palette.primary.main, my:1, py:1}}>
            <CurrentMonthAndYear />            
          </Box>
          <MyDataGrid />
        </div>
      </main>
    </div>
    </ThemeProvider>
  );
}
