import React, {useState, useEffect} from "react";
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
  const [fetchError, setFetchError] = useState(""); // error message to user

  const [columns] = useState([
    {field: "firstname", headerName: "Firstname", flex: 1},
    {field: "lastname", headerName: "Lastname", flex: 1},
    {field: "streetaddress", headerName: "Streetaddress", flex: 2},
    {field: "postcode", headerName: "Postcode", flex: 1},
    {field: "city", headerName: "City", flex: 1},
    {field: "email", headerName: "Email", flex: 2},
    {field: "phone", headerName: "Phone", flex: 1.5},
    {field: "add", headerName: "", flex: 1, disableExport: true, renderCell: params => 
      <AddTraining customer={params} addTraining={addTraining}/>},
    {field: "delete", headerName: "", flex: 1, disableExport: true, renderCell: params => 
      <Button 
        startIcon={<DeleteIcon />} 
        size="small"
        color="error" 
        onClick={() => deleteCustomer(params.row)}>
          Delete
      </Button>},
    {field: "edit", headerName: "", flex: 1, disableExport: true, renderCell: params =>
      <EditCustomer data={params} updateCustomer={updateCustomer}/>  
    }
  ])
  
  useEffect(() => {
    getCustomers();
  }, [])
  
  const getCustomers = async () => {
    try {
      const response = await fetch(API_URL_CUSTOMER);
      if (!response.ok) throw Error("something went wrong getting customers");
      const data = await response.json();
      setCustomers(data.content);
      setFetchError("");
    } catch (err) {
        setFetchError(err.message); // display message to user if fetch errors
    }
  } 

  const addCustomer = async (customer) => {
    try {
      const postOptions = {
        method: "POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(customer)
      };

      const response = await fetch(API_URL_CUSTOMER, postOptions)
      if (!response.ok) throw Error("something went wrong adding customer");
      getCustomers();
    } catch (err) {
        setFetchError(err.message);
    }
  }

  const deleteCustomer = async (data) => {
    if (window.confirm("Are you sure?")) {
      try {
        const response = await fetch(data.links[0].href, {method: "DELETE"})
        if (!response.ok) throw Error("something went wrong deleting customer");
        getCustomers();
        setOpen(!open);
      } catch (err) {
          setFetchError(err.message);
      }  
    }
  }

  const updateCustomer = async (url, customer) => {
    try {
      const updateOptions = {
        method: "PUT",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(customer)
      };
      const response = await fetch(url, updateOptions);
      if (!response.ok) throw Error("something went wrong editing customer");
      getCustomers();
    } catch (err) {
        setFetchError(err.message);
    }
  }

  
  const addTraining = async (training) => {
    try {
      const postOptions = {
        method: "POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(training)
      };

      const response = await fetch(API_URL_TRAINING, postOptions);
      if (!response.ok) throw Error("Something went wrong adding training");
    } catch (err) {
        setFetchError(err.message);
    }
  }

  return (
    <>
      {fetchError && <h2 style={{color: "red"}}>{fetchError}</h2>}
      {!fetchError && customers.length === 0 ? <Spinner /> :
      <Box>
        <Stack direction="row" gap={5} sx={{margin: 1, justifyContent: "center"}}>
          <AddCustomer addCustomer={addCustomer}/>
        </Stack>
        <Box sx={{ height: 600, width: "100%", margin: "auto" }}>
          <DataGrid
            getRowId={(row) => row.links[0].href}
            rows={customers}
            columns={columns}
            autoPageSize
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