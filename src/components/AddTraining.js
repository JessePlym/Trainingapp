import { Button, DialogTitle, Dialog, DialogContent, DialogActions, TextField, FormControl, Autocomplete } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL_TRAINING } from "../constants";

export default function AddTraining({ customer, AddTraining }) {
  const [open, setOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [training, setTraining] = useState(
    {
      date: null,
      activity: "",
      duration: 0,
      customer: customer
    }
  )
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const handleAddTraining = () => {
    console.log(training)
    setOpen(false);
    // navigate("/");
  }

  useEffect(() => {
     getTrainings();
  }, []) 

  useEffect(() => {
     filterTrainings();
  })

  const getTrainings = () => {
    fetch(API_URL_TRAINING)
    .then(response => {
      if (response.ok) return response.json();
      else alert("something went wrong getting trainings")
    })
    .then(data => setTrainings(data))
    .catch(err => console.log(err));
  }

  // loops through trainings and sets activities to own state. Only sets activity if it doesn't already exist.
  // Activities are used for Autocomplete options
  const filterTrainings = () => {
    trainings.forEach((training) => {
      if (!(activities.includes(training.activity))) {
        setActivities([...activities, training.activity]);
      }
    })
  }


  return (
    <>
      <Button
        startIcon={<AddIcon />}
        size="small"
        color="primary"
        onClick={() => setOpen(true)}>
          Add
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <FormControl sx={{width: 350}}>
            <Autocomplete
              options={activities}
              freeSolo
              autoSelect
              renderInput={(params) => <TextField {...params} label="Training"/>}
              onChange={(e, newValue) => setTraining({...training, activity: newValue})}
            />
          </FormControl>
          <FormControl sx={{width: 350}}>
            <TextField
              value={training.duration}
              label="Duration"
              margin="dense"
              type="number"
              onChange={e => setTraining({...training, duration: e.target.value})}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>  
          <Button onClick={handleAddTraining}>Add</Button>  
        </DialogActions>
      </Dialog>
    </>
  );
}