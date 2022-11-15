import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { PAGES } from "../constants"
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"

export default function DrawerMenu() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
    setOpenDrawer(false);
  }
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {
            PAGES.map((page, index) => (
              <ListItemButton onClick={() => handleClick(page.link)} key={index}>
                <ListItemIcon>
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.name}/>
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

