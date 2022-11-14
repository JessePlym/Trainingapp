import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu"
import { TABS } from "../constants"
import { BrowserRouter, routes, route } from "react-router-dom"; 

export default function DrawerMenu() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleClick = (index) => {
    setTabValue(index)
    setOpenDrawer(false);
  }
  console.log(tabValue)
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {
            TABS.map((tab, index) => (
              <ListItemButton onClick={() => handleClick(index)} key={index}>
                <ListItemIcon>
                  <ListItemText>{tab}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            ))
          }
        </List>
      </Drawer>
      <IconButton
        sx={{color: "white", marginRight: "auto"}} 
        onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
      
    </>
  );
}