import React, {useState, useEffect} from "react";
import { API_URL_GETTRAINING, API_URL_TRAINING } from "../constants";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { Button, Snackbar, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false); // for opening snackbar

  const [columnDefs] = useState([
    {field: "date", sortable: true, filter: true, width: 220,
      valueFormatter: params => params.value !== null ? dayjs(params.value.substring(0, 19)).format("DD MMMM YYYY HH:mm") : ""
    }, // MMMM displays full name of month and HH 24 hour clock. If date is null display empty string
    {field: "activity", sortable: true, filter: true},
    {field: "duration", headerName: "Duration (min)", sortable: true, filter: true},
    {field: "customer", headerName: "Customer",
      cellRenderer: params => params.data.customer.firstname + " " + params.data.customer.lastname
    },
    {cellRenderer: params => 
      <Button startIcon={<DeleteIcon />} size="small" color="error" onClick={() => deleteTraining(params.data.id)}> 
        Delete
      </Button>}
  ])

  const getTrainings = () => {
    fetch(API_URL_GETTRAINING)
    .then(response => {
      if (response.ok) return response.json();
      else alert("something went wrong showing trainings")
    })
    .then(data => setTrainings(data))
    .catch(err => console.log(err));
  }

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(API_URL_TRAINING + "/" + id, {method: "DELETE"})
      .then(response => {
        if (response.ok) {
          getTrainings();
          setOpen(true); // opens snackbar
        } else alert("something went wrong deleting training");
      })
      .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    getTrainings();
  }, [trainings])

  

  return (
    <>
      <div className="ag-theme-material" style={{height: 600, width: "90%", margin: "auto"}}>
        <AgGridReact
          rowData={trainings}
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
          Training deleted successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
