import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export const API_URL_CUSTOMER = "https://customerrest.herokuapp.com/api/customers";
export const API_URL_TRAINING = "https://customerrest.herokuapp.com/gettrainings";
export const PAGES = [
  {name: "TRAININGS", link: "/", icon: <FitnessCenterIcon />}, 
  {name: "CUSTOMERS", link: "/customers", icon: <PeopleIcon />}
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