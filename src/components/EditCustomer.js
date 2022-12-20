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
        firstName: data.row.firstName,
        lastName: data.row.lastName,
        streetAddress: data.row.streetAddress,
        postcode: data.row.postcode,
        city: data.row.city,
        email: data.row.email,
        phone: data.row.phone
      })
    }
  }

  const handleUpdate = () => {
    updateCustomer(data.row.id, customer);
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
            value={customer.firstName}
            label="firstname"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, firstName: e.target.value})}
          />
          <TextField 
            value={customer.lastName}
            label="lastname"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, lastName: e.target.value})}
          />
          <TextField 
            value={customer.streetAddress}
            label="streetaddress"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, streetAddress: e.target.value})}
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