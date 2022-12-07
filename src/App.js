import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import Statistics from "./components/Statistics";
import PageNotFound from "./components/PageNotFound";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom"




function App() {
  return (
    <>
    <Container>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<TrainingList />}/>
        <Route path="/customers" element={<CustomerList />}/>
        <Route path="/calendar" element={<Calendar />}/>
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </Container>
    </>
  );
}

export default App;
