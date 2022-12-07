import { Button, DialogTitle, 
  Dialog, DialogContent, 
  DialogActions, TextField, 
  FormControl, Autocomplete, 
  Stack, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL_GETTRAINING } from "../constants";
import { DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
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
    setTraining(prevTraining => ({...prevTraining, date: dayjs(prevTraining.date).utc(true)}));
    setOpen(false);
    addTraining(training);
    setTimeout(() => {
      navigate("/");
    }, 500); 
    // I set a small delay before the app redirects to trainings page. Otherwise I noticed that the 
    // trainings page does fetch too early and it didnt show newly added training. With timeout it started working 
    // as should.
  }

  const changeDate = (date) => {
    if (date != null) {
      setTraining({...training, date: date.toISOString()});
    } else {
      setTraining({...training, date: ""});
    }

  }

  useEffect(() => {
     getTrainings();
  }, [])
  
  useEffect(() => {
    filterTrainings();
  })

  const getTrainings = async () => {
    try {
      const response = await fetch(API_URL_GETTRAINING);
      if (response.ok) {
        const data = await response.json();
        setTrainings(data);
      } else {
        alert("something went wrong showing trainings");
      }
    } catch (err) {
      console.log(err.message);
    }
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
                <DateTimePicker 
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