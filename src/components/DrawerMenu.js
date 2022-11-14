import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu"
import { PAGES } from "../constants"
import { useNavigate } from "react-router-dom"; 

export default function DrawerMenu(props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  console.log(props)

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
                    <ListItemText primary={page.name}/>
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

