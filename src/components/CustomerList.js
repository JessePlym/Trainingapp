import React, {useState, useEffect, useRef} from "react";
import { API_URL_CUSTOMER, API_URL_TRAINING } from "../constants";
import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
import { Button, Snackbar, Alert, Stack, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer"
import AddTraining from "./AddTraining";
import Spinner from "./Spinner";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false); // for snackbar
  const gridRef = useRef();

  const [columns] = useState([
    {field: "firstname", headerName: "Firstname", sortable: true, filter: true, width: 140},
    {field: "lastname", headerName: "Lastname", sortable: true, filter: true, width: 140},
    {field: "streetaddress", headerName: "Streetaddress", sortable: true, filter: true, width: 160},
    {field: "postcode", headerName: "Postcode", sortable: true, filter: true, width: 140},
    {field: "city", headerName: "City", sortable: true, filter: true, width: 140},
    {field: "email", headerName: "Email", sortable: true, filter: true, width: 180},
    {field: "phone", headerName: "Phone", sortable: true, filter: true, width: 140},
    {field: "add", type: "actions", width: 140, renderCell: params => 
      <AddTraining customer={params} addTraining={addTraining}/>},
    {field: "delete", type: "actions", width: 140, renderCell: params => 
      <Button 
        startIcon={<DeleteIcon />} 
        size="small"
        color="error" 
        onClick={() => deleteCustomer(params.row)}>
          Delete
      </Button>},
    {field: "edit", type: "actions", width: 140, renderCell: params =>
      <EditCustomer data={params} updateCustomer={updateCustomer}/>  
    }
  ])
  
  useEffect(() => {
    getCustomers();
  }, [])
  
  const getCustomers = () => {
    fetch(API_URL_CUSTOMER)
    .then(response => { 
      if (response.ok) return response.json();
      else alert("something went wrong getting customers");
    })
    .then(data => setCustomers(data.content))
    .catch(err => console.log(err));
  }

  const addCustomer = (customer) => {
    fetch(API_URL_CUSTOMER, {
      method: "POST",
      headers: {"Content-type" : "application/json"},
      body: JSON.stringify(customer)
    })
    .then(response => {
      if (response.ok) getCustomers();
      else alert("something went wrong adding customer"); 
    })
    .catch(err => console.log(err));
  }

  const deleteCustomer = (data) => {
    if (window.confirm("Are you sure?")) {
      fetch(data.links[0].href, {method: "DELETE"})
      .then(response => {
        if (response.ok) {
          getCustomers();
          setOpen(true);
        }
        else alert("something went wrong deleting customer");
      })
      .catch(err => console.log(err));  
    }
  }

  const updateCustomer = (url, customer) => {
    fetch(url, {
      method: "PUT",
      headers: {"Content-type" : "application/json"},
      body: JSON.stringify(customer)
    })
    .then(response => {
      if (response.ok) getCustomers();
      else alert("something went wrong editing customer");
    })
    .catch(err => console.log(err));
  }

  
  const addTraining = (training) => {
    fetch(API_URL_TRAINING, {
      method: "POST",
      headers: {"Content-type" : "application/json"},
      body: JSON.stringify(training)
    })
    .then(response => {
      if (response.ok) return;
      else alert("something went wrong adding training")
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      {customers.length === 0 ? <Spinner /> :
      <Box>
        <Stack direction="row" gap={5} sx={{margin: 1, justifyContent: "center"}}>
          <AddCustomer addCustomer={addCustomer}/>
        </Stack>
        <Box sx={{ height: 600, width: "100%", margin: "auto" }}>
          <DataGrid
            ref={gridRef}
            getRowId={(row) => row.links[0].href}
            rows={customers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            components={{ Toolbar: GridToolbarExport }}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}/>
        </Box>
      </Box> }
      <Snackbar 
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} 
        autoHideDuration={6000} 
        onClose={() => setOpen(false)}>
        <Alert 
          onClose={() => setOpen(false)} 
          severity="success" 
          sx={{ width: '100%' }}>
          Customer deleted successfully!
        </Alert>
      </Snackbar>  
    </>
  );
}