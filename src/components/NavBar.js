import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';


export default function NavBar() {
 
  const [value, setValue] = useState(0);
  
  const selectTab = (e, value) => {
    setValue(value);
  } 

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Tabs 
            value={value} 
            onChange={selectTab}
            indicatorColor="primary"
            textColor="inherit"
            >
              <Tab value={0} label="TRAININGS"/>
              <Tab value={1} label="CUSTOMERS"/>
          </Tabs>
          <Typography variant="h5" align="right">
            Training app
          </Typography>
        </Toolbar>
      </AppBar>
      {value === 0 && <TrainingList />}
      {value === 1 && <CustomerList />}
    </>
  );
}