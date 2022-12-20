import { Button, DialogTitle, 
  Dialog, DialogContent, 
  DialogActions, TextField, 
  FormControl, 
  Stack, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

export default function AddTraining({ customer, addTraining }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState(
    {
      date: null,
      activity: "",
      duration: 0,
      customer: {
        id: customer.id
      } 
    }
  )
  const navigate = useNavigate();

  const handleAddTraining = () => {
    setTraining(prevTraining => ({...prevTraining, date: dayjs(prevTraining.date).utc(true)}));
    setOpen(false);
    addTraining(training);
    navigate("/");
  }

  const changeDate = (date) => {
    if (date != null) {
      setTraining({...training, date: date.toISOString()});
    } else {
      setTraining({...training, date: ""});
    }
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
              <TextField
                value={training.activity}
                label="Training"
                margin="dense"
                onChange={e => setTraining({...training, activity: e.target.value})}
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