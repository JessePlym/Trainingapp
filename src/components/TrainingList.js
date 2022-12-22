import React, { useState } from "react";
import { BASE_API_URL } from "../constants";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Snackbar, Alert, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Spinner from "./Spinner";
import dayjs from "dayjs";

export default function TrainingList({ trainings, getTrainings }) {
  const [open, setOpen] = useState(false); // for opening snackbar

  const [columns] = useState([
    {field: "date", headerName: "Date", flex: 2 ,
      valueFormatter: params => params.value ? dayjs(params.value.substring(0, 19)).format("DD MMMM YYYY HH:mm") : ""
    }, // MMMM displays full name of month and HH 24 hour clock. If date is null render empty string
    {field: "activity", headerName: "Activity", flex: 1},
    {field: "duration", headerName: "Duration (min)", flex: 1},
    {field: "customer", headerName: "Customer", flex: 1,
      renderCell: params => params.value ? getFullName(params) : "" // render empty string if customer is null;
    },
    {field: "delete", headerName: "", flex: 1, renderCell: params => 
      <Button startIcon={<DeleteIcon />} size="small" color="error" onClick={() => deleteTraining(params.row.id)}> 
        Delete
      </Button>
      }
  ])

  const getFullName = (params) => {
    return `${params.value.firstName || ''} ${params.value.lastName || ''}`;
  }

  const deleteTraining = async (id) => {
    try {
      if (window.confirm("Are you sure?")) {
        const response = await fetch(`${BASE_API_URL}/trainings/${id}`, {method: "DELETE"});
        if (!response.ok) throw Error("Something went wrong deleting training!")
        getTrainings();
        setOpen(!open); // opens snackbar
      }
    } catch (err) {
      alert(err.message);
    }
  }  

  return (
    <>
      {trainings.length === 0 ? <Spinner /> :
        <Box sx={{ height: 600, width: "100%", margin: "auto" }}>
          <DataGrid
            rows={trainings}
            columns={columns}
            autoPageSize
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
        autoHideDuration={4000} 
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
