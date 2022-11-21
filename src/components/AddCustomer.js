import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Avatar } from "@mui/material";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";

export const initialCustomerState = {
  firstname: "",
  lastname: "",
  streetaddress: "",
  postcode: "",
  city: "",
  email: "",
  phone: "",
};


export default function AddCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(initialCustomerState);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleAdd = () => {
    props.addCustomer(customer);
    setCustomer(initialCustomerState);
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
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, firstname: e.target.value})}
          />
          <TextField 
            value={customer.lastname}
            label="lastname"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, lastname: e.target.value})}
          />
          <TextField 
            value={customer.streetaddress}
            label="streetaddress"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
          />
          <TextField 
            value={customer.postcode}
            label="postcode"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
          />
          <TextField 
            value={customer.city}
            label="city"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, city: e.target.value})}
          />
          <TextField 
            value={customer.email}
            label="email"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, email: e.target.value})}
          />
          <TextField 
            value={customer.phone}
            label="phone"
            margin="dense"
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