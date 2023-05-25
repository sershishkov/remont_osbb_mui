'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme_dark from '../mui_theme/theme_dark';
import theme_light from '../mui_theme/theme_light';
import Navbar from '@/componens/mainLayout/Navbar';
import Footer from '@/componens/mainLayout/Footer';

import Grid from '@mui/material/Grid';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, set__isDark] = useState<boolean>(false);

  useEffect(() => {
    const is_dark = JSON.parse(localStorage.getItem('theme')!);
    set__isDark(is_dark);
  }, []);
  return (
    <html lang='en'>
      <body>
        <ThemeProvider theme={isDark ? theme_dark : theme_light}>
          <CssBaseline />
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Navbar />
            </Grid>
            <Grid item sx={{ mt: '68px' }}>
              <main>{children}</main>
            </Grid>
            <Grid item>
              <Footer />
            </Grid>
            <ToastContainer
              autoClose={1000}
              // position='top-left'
              // hideProgressBar={false}
              // newestOnTop={false}
              // closeOnClick
              // rtl={false}
              // pauseOnFocusLoss
              // draggable
              // pauseOnHover
            />
          </Grid>
        </ThemeProvider>
      </body>
    </html>
  );
}
