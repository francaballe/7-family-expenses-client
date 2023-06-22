"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Head from 'next/head';
import CurrentMonthAndYear from './components/CurrentMonthAndYear';
import MyDataGrid from './components/MyDataGrid';
import styles from './page.module.css';
import theme from "./theme";
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function Home() {

  return (
    <ThemeProvider theme={theme}>
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
                <MyDataGrid />
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

