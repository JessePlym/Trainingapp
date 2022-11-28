import { Button, DialogTitle, 
  Dialog, DialogContent, 
  DialogActions, TextField, 
  FormControl, Autocomplete, 
  Stack, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL_GETTRAINING } from "../constants";
import { DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

export default function AddTraining({ customer, addTraining }) {
  const [open, setOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [training, setTraining] = useState(
    {
      date: null,
      activity: "",
      duration: 0,
      customer: customer.id 
    }
  )
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const handleAddTraining = () => {
    setOpen(false);
    addTraining(training);
    navigate("/");
  }

  const changeDate = (date) => {
    if (date != null) {
      setTraining({...training, date: dayjs(date).utc(true).toISOString()});
    } else {
      setTraining({...training, date: ""});
    }

  }

  useEffect(() => {
     getTrainings();
  }, [trainings])
  
  useEffect(() => {
    filterTrainings();
  })

  const getTrainings = () => {
    fetch(API_URL_GETTRAINING)
    .then(response => {
      if (response.ok) return response.json();
      else alert("something went wrong getting trainings")
    })
    .then(data => setTrainings(data))
    .catch(err => console.log(err));
  }

  // loops through trainings and sets activities to own state. Only sets activity if it doesn't already exist.
  // Activities are used for Autocomplete options
  const filterTrainings = useCallback(() => {
    trainings.forEach((training) => {
      if (!(activities.includes(training.activity))) {
        setActivities([...activities, training.activity]);
      }
    })
  }, [trainings, activities])

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
                <DatePicker 
                  value={training.date}
                  label="Date"
                  disablePast
                  inputFormat="DD.MM.YYYY HH:mm"
                  disable
                  onChange={date => changeDate(date)}
                  renderInput={(params) => 
                    <TextField {...params} inputProps={{...params.inputProps, readOnly: true}} />
                  }
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