import React, {useState} from 'react';
import { useMediaQuery, useTheme, AppBar, Toolbar, Typography, Tab, Tabs } from '@mui/material';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import DrawerMenu from './DrawerMenu';
import { TABS } from '../constants';


export default function NavBar() {
 
  const [value, setValue] = useState(0);

  const theme = useTheme();
  // this is used for small screen sizes 
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const selectTab = (e, value) => {
    setValue(value);
  } 

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {
            isMatch ? (
              <>
                <DrawerMenu />
                <Typography variant="h5" sx={{ marginLeft: "30px"}}>
                  Training App
                </Typography>
              </>
            ) : (
              <>
                <DrawerMenu />
                <Typography variant="h5" sx={{ marginLeft: "30px"}}>
                  Training App
                </Typography>
                <Tabs 
                  value={value} 
                  onChange={selectTab}
                  indicatorColor="primary"
                  textColor="inherit"
                  sx={{ marginLeft: "auto"}}
                >
                  {
                    TABS.map((tab, index) => {
                      return<Tab key={index} label={tab}/>
                    })
                  }
                  <Tab value={0} label="TRAININGS"/>
                  <Tab value={1} label="CUSTOMERS"/>
                </Tabs>
              </>
            )
          }
        </Toolbar>
      </AppBar>
      {value === 0 && <TrainingList />}
      {value === 1 && <CustomerList />}
    </>
  );
}