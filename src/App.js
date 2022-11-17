import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import NavBar from "./components/NavBar";
import { Container } from "@mui/material";

import { Routes, Route, Navigate } from "react-router-dom"




function App() {
  return (
    <>
    <Container>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<TrainingList />}/>
        <Route path="/customers" element={<CustomerList />}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Container>
    </>
  );
}

export default App;
