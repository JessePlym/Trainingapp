import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import DrawerMenu from './DrawerMenu';



export default function NavBar() {

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <DrawerMenu />
          <Typography variant="h5" sx={{ marginRight: "auto"}}>
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar> 
    </>
  );
}