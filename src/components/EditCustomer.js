import { Dialog, DialogContent, Button, DialogTitle, DialogActions, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { INITIAL_CUSTOMER_STATE } from "../constants";

export default function EditCustomer({ data, updateCustomer}) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER_STATE);

  const handleDialog = () => {
    setOpen(!open);
    if (open === false) {
      setCustomer({
        firstname: data.row.firstname,
        lastname: data.row.lastname,
        streetaddress: data.row.streetaddress,
        postcode: data.row.postcode,
        city: data.row.city,
        email: data.row.email,
        phone: data.row.phone
      })
    }
  }

  const handleUpdate = () => {
    updateCustomer(data.id, customer);
    setOpen(false);
  }
  return (
    <>
      <Button
        startIcon={<EditIcon />}
        size="small"
        color="success"
        onClick={handleDialog}>
          Edit
      </Button>
      <Dialog open={open} onClose={handleDialog}>
        <DialogTitle>Edit Customer Information</DialogTitle>
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
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, phone: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}