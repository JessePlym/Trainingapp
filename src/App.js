import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import Statistics from "./components/Statistics";
import PageNotFound from "./components/PageNotFound";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom"
import { BASE_API_URL } from "./constants";


function App() {
  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [fetchError, setFetchError] = useState(""); // error message to user

  useEffect(() => {
    getCustomers();
    getTrainings();
  }, [])

  const getCustomers = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/customers`);
      if (!response.ok) throw Error("something went wrong getting customers");
      const data = await response.json();
      setCustomers(data);
      setFetchError("");
    } catch (err) {
        setFetchError(err.message); // display message to user if fetch errors
    }
  }
  
  const getTrainings = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/trainings`);
      if (!response.ok) throw Error("something went wrong showing trainings");
      const data = await response.json();
      setTrainings(data);
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <>
    <Container>
      <NavBar />
      <Routes>
        <Route exact path="/" element={
          <TrainingList
            trainings={trainings}
            getTrainings={getTrainings}
          />}
        />
        <Route path="/customers" element={
          <CustomerList 
            customers={customers}
            getCustomers={getCustomers}
            getTrainings={getTrainings}
            fetchError={fetchError}
            setFetchError={setFetchError}
          />}
        />
        <Route path="/calendar" element={<Calendar />}/>
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </Container>
    </>
  );
}

export default App;
