"use client";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import React, { useEffect } from 'react';
import styles from '../page.module.css';
import theme from "../theme";
import CurrentMonthAndYear from './CurrentMonthAndYear';
import MyDataGrid from './MyDataGrid';
import { useRouter } from 'next/navigation';
import axios from "axios";
import MonthContext from './MonthContext';



export default function Page() {

  const [savedTkn,setSavedTkn] = React.useState("")
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const router = useRouter();

  useEffect(()=>{            
    setSavedTkn(localStorage.getItem("Tkn"));
  },[])

  async function getData(){        
    const headers = {
      Authorization: `Bearer ${savedTkn}`
    };

    if (savedTkn.length){
      try {
        const resp = await axios.get("http://localhost/api/expenses",{headers}) 
  
        if (resp.status === 200) {                                  
          //console.log("expenses response OK")          
        } 
      } catch (error) {
        console.log("Error:", error.message);
        router.push('/')      
      }
    }
    
  }
  
  React.useEffect(()=>{
    getData();          
  },[savedTkn])

  

  return (
    <ThemeProvider theme={theme}>
      <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.primary.main,
                my: 1,
                py: 1,
              }}
            >
              <CurrentMonthAndYear />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MyDataGrid token={savedTkn}/>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
      </MonthContext.Provider>
    </ThemeProvider>
  );
}

