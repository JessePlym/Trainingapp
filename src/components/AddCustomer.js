import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from "@mui/material";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { INITIAL_CUSTOMER_STATE } from "../constants";


export default function AddCustomer({ addCustomer }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER_STATE);

  const handleDialog = () => {
    setOpen(!open);
  }

  const handleAdd = () => {
    addCustomer(customer);
    setCustomer(INITIAL_CUSTOMER_STATE);
    setOpen(false);
  }

  return (
    <>
      <Button 
        variant="outlined" 
        type="button" 
        onClick={handleDialog} 
        startIcon={<PersonAddIcon />}>
          Add Customer
      </Button>
      <Dialog open={open} onClose={handleDialog}>
        <DialogTitle>
          Add Customer
        </DialogTitle>
        <DialogContent>
          <TextField 
            value={customer.firstName}
            label="Firstname"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, firstName: e.target.value})}
          />
          <TextField 
            value={customer.lastName}
            label="Lastname"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, lastName: e.target.value})}
          />
          <TextField 
            value={customer.streetAddress}
            label="Streetaddress"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, streetAddress: e.target.value})}
          />
          <TextField 
            value={customer.postcode}
            label="Postcode"
            margin="dense"
            type="number"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
          />
          <TextField 
            value={customer.city}
            label="City"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, city: e.target.value})}
          />
          <TextField 
            value={customer.email}
            label="Email"
            margin="dense"
            type="email"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, email: e.target.value})}
          />
          <TextField 
            value={customer.phone}
            label="Phone"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setCustomer({...customer, phone: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );

}