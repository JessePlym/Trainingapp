import React, {useState, useEffect, useRef} from "react";
import { API_URL_TRAINING } from "../constants";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const rowRef = useRef();

  const [columnDefs] = useState([
    {field: "date", sortable: true, filter: true},
    {field: "duration", sortable: true, filter: true},
    {field: "activity", sortable: true, filter: true},
    {field: "customer", sortable: true, filter: true}
  ])

  const getTrainings = () => {
    fetch(API_URL_TRAINING)
    .then(response => {
      if (response.ok) return response.json();
      else alert("something went wrong fetching trainings");
    })
    .then(data => setTrainings(data.content))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getTrainings();
  }, [])

  

  return (
    <>
      <div className="ag-theme-material" style={{height: 600, width: "90%", margin: "auto"}}>
        <AgGridReact
          ref={rowRef}
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          suppressCellFocus={true}
        />
      </div>
    </>
  );
}
