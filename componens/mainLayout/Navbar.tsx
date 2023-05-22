'use client';
import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import NavigationList from './NavigationList';
import { MaterialUISwitch } from './MaterialUISwitch';

const Navbar = () => {
  const initial_theme: boolean =
    window.localStorage.getItem('theme') !== null
      ? JSON.parse(window.localStorage.getItem('theme')!)
      : true;
  const [openDrawer, set__openDrawer] = useState<boolean>(false);
  const [themeChecked, set__themeChecked] = useState<boolean>(initial_theme);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      set__openDrawer(open);
    };

  const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const my_theme = event.target.checked;
    set__themeChecked(my_theme);
    localStorage.setItem('theme', JSON.stringify(my_theme));
    // console.log(my_theme);
    window.location.reload();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={'left'}
            open={openDrawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <NavigationList toggleDrawer={toggleDrawer} />
          </SwipeableDrawer>
          <Link href='/' sx={{ flexGrow: 1, color: '#fff' }}>
            Расчет Ремонтов
          </Link>

          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={themeChecked}
            onChange={toggleTheme}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
