import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import NavBar from "./components/NavBar";

import { Routes, Route } from "react-router-dom"




function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<TrainingList />}/>
      <Route path="/customers" element={<CustomerList />}/>
    </Routes>
    </>
  );
}

export default App;
