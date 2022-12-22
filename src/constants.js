import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

export const BASE_API_URL = "https://customers-rest-data.herokuapp.com";
export const PAGES = [
  {name: "TRAININGS", link: "/", icon: <FitnessCenterIcon />}, 
  {name: "CUSTOMERS", link: "/customers", icon: <PeopleIcon />},
  {name: "CALENDAR", link: "/calendar", icon: <EventIcon />},
  {name: "STATISTICS", link: "/statistics", icon: <LeaderboardIcon /> }
]

export const INITIAL_CUSTOMER_STATE = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  postcode: "",
  city: "",
  email: "",
  phone: "",
};