import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

export const API_URL_CUSTOMER = "https://customerrest.herokuapp.com/api/customers";
export const API_URL_TRAINING = "https://customerrest.herokuapp.com/api/trainings";
export const API_URL_GETTRAINING = "https://customerrest.herokuapp.com/gettrainings";
export const PAGES = [
  {name: "TRAININGS", link: "/PersonalTrainer", icon: <FitnessCenterIcon />}, 
  {name: "CUSTOMERS", link: "/customers", icon: <PeopleIcon />},
  {name: "CALENDAR", link: "/calendar", icon: <EventIcon />},
  {name: "STATISTICS", link: "/statistics", icon: <LeaderboardIcon /> }
]

export const INITIAL_CUSTOMER_STATE = {
  firstname: "",
  lastname: "",
  streetaddress: "",
  postcode: "",
  city: "",
  email: "",
  phone: "",
};