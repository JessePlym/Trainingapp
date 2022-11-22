import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from "@mui/material";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { INITIAL_CUSTOMER_STATE } from "../constants";


export default function AddCustomer({ addCustomer }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER_STATE);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleAdd = () => {
    addCustomer(customer);
    setCustomer(INITIAL_CUSTOMER_STATE);
    setOpen(false);
  }

  return (
    <>
      <Stack direction="horizontal" sx={{marginTop: 1, justifyContent: "center"}}>
        <Button 
          variant="outlined" 
          type="button" 
          onClick={handleOpen} 
          startIcon={<PersonAddIcon />}>
            Add Customer
        </Button>
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add Customer
        </DialogTitle>
        <DialogContent>
          <TextField 
            autoFocus
            value={customer.firstname}
            label="firstname"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, firstname: e.target.value})}
          />
          <TextField 
            value={customer.lastname}
            label="lastname"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, lastname: e.target.value})}
          />
          <TextField 
            value={customer.streetaddress}
            label="streetaddress"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
          />
          <TextField 
            value={customer.postcode}
            label="postcode"
            margin="dense"
            type="number"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
          />
          <TextField 
            value={customer.city}
            label="city"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, city: e.target.value})}
          />
          <TextField 
            value={customer.email}
            label="email"
            margin="dense"
            type="email"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, email: e.target.value})}
          />
          <TextField 
            value={customer.phone}
            label="phone"
            margin="dense"
            type="number"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, phone: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );

}