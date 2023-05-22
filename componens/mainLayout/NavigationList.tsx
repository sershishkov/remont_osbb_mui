'use client';
import React, { useState } from 'react';

import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function NavigationList({ toggleDrawer }: { toggleDrawer: Function }) {
  const user = true;
  const [openAuth, set__openAuth] = useState<boolean>(false);
  // const [open__RefData, set__open__RefData] = useState<boolean>(false);
  // const [open__accounting, set__open__accounting] = useState<boolean>(false);

  // const onLogout = () => {
  //   dispatch(logout());
  //   navigate('/');
  // };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      onClick={() => toggleDrawer(false)}
    >
      <ListItemButton onClick={() => set__openAuth(!openAuth)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary='Пользователь' />
        {openAuth ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAuth} timeout='auto' unmountOnExit>
        <List disablePadding>
          {user ? (
            <>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  toggleDrawer(false);
                  // onLogout();
                }}
              >
                <ListItemIcon>
                  <FaSignOutAlt />
                </ListItemIcon>
                <ListItemText primary='Выход' />
              </ListItemButton>
              {/* <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/user-details'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <FaUser />
                </ListItemIcon>
                <ListItemText primary={`${user.name}`} />
              </ListItemButton> */}
            </>
          ) : (
            <>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/register'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <FaUser />
                </ListItemIcon>
                <ListItemText primary='Регистрация' />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/login'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <FaSignInAlt />
                </ListItemIcon>
                <ListItemText primary='Вход' />
              </ListItemButton>
            </>
          )}
          {/* {user?.role === 'admin' && (
            <>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/user-admin'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <FaSignInAlt />
                </ListItemIcon>
                <ListItemText primary='Пользователи' />
              </ListItemButton>
            </>
          )} */}
        </List>
      </Collapse>
    </List>
  );
}

export default NavigationList;
