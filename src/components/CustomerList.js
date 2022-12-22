import React, {useState} from "react";
import { BASE_API_URL } from "../constants";
import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
import { Button, Snackbar, Alert, Stack, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer"
import AddTraining from "./AddTraining";
import Spinner from "./Spinner";

export default function CustomerList({
  customers,
  getCustomers, 
  fetchError, 
  setFetchError, 
  getTrainings
}) {
  const [open, setOpen] = useState(false); // for snackbar
  const [columns] = useState([
    {field: "firstName", headerName: "Firstname", flex: 1},
    {field: "lastName", headerName: "Lastname", flex: 1},
    {field: "streetAddress", headerName: "Streetaddress", flex: 2},
    {field: "postcode", headerName: "Postcode", flex: 1},
    {field: "city", headerName: "City", flex: 1},
    {field: "email", headerName: "Email", flex: 2},
    {field: "phone", headerName: "Phone", flex: 1.5},
    {field: "add", headerName: "", flex: 1, disableExport: true, renderCell: params =>
      <AddTraining
        customer={params}
        addTraining={addTraining}/>},
    {field: "delete", headerName: "", flex: 1, disableExport: true, renderCell: params => 
      <Button 
        startIcon={<DeleteIcon />} 
        size="small"
        color="error" 
        onClick={() => deleteCustomer(params.row.id)}>
          Delete
      </Button>},
    {field: "edit", headerName: "", flex: 1, disableExport: true, renderCell: params =>
      <EditCustomer data={params} updateCustomer={updateCustomer}/>  
    }
  ])

  const addCustomer = async (customer) => {
    try {
      const postOptions = {
        method: "POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(customer)
      };

      const response = await fetch(`${BASE_API_URL}/customers`, postOptions)
      if (!response.ok) throw Error("something went wrong adding customer");
      getCustomers();
    } catch (err) {
        setFetchError(err.message);
    }
  }

  const deleteCustomer = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const response = await fetch(`${BASE_API_URL}/customers/${id}`, {method: "DELETE"})
        if (!response.ok) throw Error("something went wrong deleting customer");
        getCustomers();
        getTrainings();
        setOpen(!open);
      } catch (err) {
          setFetchError(err.message);
      }  
    }
  }

  const updateCustomer = async (id, customer) => {
    try {
      const updateOptions = {
        method: "PUT",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(customer)
      };
      const response = await fetch(`${BASE_API_URL}/customers/${id}`, updateOptions);
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

      const response = await fetch(`${BASE_API_URL}/trainings`, postOptions);
      if (!response.ok) throw Error("Something went wrong adding training");
      getTrainings();
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
        autoHideDuration={4000} 
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