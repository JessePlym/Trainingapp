import React, {useState, useEffect} from "react";
import { API_URL_GETTRAINING, API_URL_TRAINING } from "../constants";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Button, Snackbar, Alert, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Spinner from "./Spinner";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false); // for opening snackbar

  const [columns] = useState([
    {field: "date", headerName: "Date", sortable: true, filter: true, width: 220,
      valueFormatter: params => params.value !== null ? dayjs(params.value.substring(0, 19)).format("DD MMMM YYYY HH:mm") : ""
    }, // MMMM displays full name of month and HH 24 hour clock. If date is null display empty string
    {field: "activity", headerName: "Activity", sortable: true, filter: true, width: 140},
    {field: "duration", headerName: "Duration (min)", sortable: true, filter: true, width: 140},
    {field: "customer", headerName: "Customer", width: 140,
      renderCell: params => getFullName(params)
    },
    {field: "actions", type: "actions", renderCell: params => 
      <Button startIcon={<DeleteIcon />} size="small" color="error" onClick={() => deleteTraining(params.row.id)}> 
        Delete
      </Button>
      }
  ])

  const getFullName = (params) => {
    return `${params.value.firstname || ''} ${params.value.lastname || ''}`
  }

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
      {trainings.length === 0 ? <Spinner /> :
        <Box sx={{ height: 600, width: "100%", margin: "auto" }}>
          <DataGrid
            rows={trainings}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}/>
        </Box>
      }
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
