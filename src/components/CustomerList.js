import React, {useState, useEffect, useRef} from "react";
import { API_URL_CUSTOMER } from "../constants";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer"

export default function CustomerList(props) {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false); // for snackbar
  const rowRef = useRef();

  const [columnDefs] = useState([
    {field: "firstname", sortable: true, filter: true, width: 140},
    {field: "lastname", sortable: true, filter: true, width: 140},
    {field: "streetaddress", sortable: true, filter: true},
    {field: "postcode", sortable: true, filter: true, width: 140},
    {field: "city", sortable: true, filter: true, width: 140},
    {field: "email", sortable: true, filter: true, width: 180},
    {field: "phone", sortable: true, filter: true, width: 140},
    {width: 140, cellRenderer: params => 
      <Button 
        startIcon={<DeleteIcon />} 
        size="small"
        color="error" 
        onClick={() => deleteCustomer(params.data)}>
          Delete
      </Button>},
    {width: 140, cellRenderer: params =>
      <Button
        startIcon={<EditIcon />}
        size="small"
        color="success"
        onClick={<EditCustomer />}>
          Edit
      </Button>}
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

  return (
    <>
      <AddCustomer addCustomer={addCustomer}/>
      <div className="ag-theme-material" style={{height: 550, width: "100%", margin: "auto"}}>
        <AgGridReact
          ref={rowRef}
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          suppressCellFocus={true}
        />
      </div>
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