import { Button, DialogTitle, 
  Dialog, DialogContent, 
  DialogActions, TextField, 
  FormControl, Autocomplete, 
  Stack, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL_TRAINING } from "../constants";
import { DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AddTraining({ customer, addTraining }) {
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

  //TODO
  const handleAddTraining = () => {
    console.log(training);
    addTraining(training);
    setOpen(false);
    navigate("/");
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
          <Stack direction="row" spacing={2} width="auto" sx={{alignItems: "center", marginBottom: 1}}>
            <FormControl fullWidth >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker 
                  value={training.date}
                  label="Date"
                  disablePast
                  minutesStep={1}
                  onChange={(newValue) => setTraining({...training, date: newValue})}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth >
              <TextField
                value={training.duration}
                label="Duration"
                margin="dense"
                type="number"
                onChange={e => setTraining({...training, duration: e.target.value})}
                InputProps={{
                  startAdornment: <InputAdornment position="start">min</InputAdornment>,
                }}
              />
            </FormControl>
          </Stack>
          <Stack direction="row" width="auto">
            <FormControl fullWidth>
              <Autocomplete
                options={activities}
                freeSolo
                autoSelect
                renderInput={(params) => <TextField {...params} label="Training"/>}
                onChange={(e, newValue) => setTraining({...training, activity: newValue})}
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>  
          <Button onClick={handleAddTraining}>Add</Button>  
        </DialogActions>
      </Dialog>
    </>
  );
}