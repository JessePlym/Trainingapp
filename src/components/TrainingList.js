import React, {useState, useEffect} from "react";
import { API_URL_TRAINING } from "../constants";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  const [columnDefs] = useState([
    {field: "date", sortable: true, filter: true, width: 220,
      valueFormatter: params => !null ? dayjs(params.value.substring(0, 19)).format("DD MMMM YYYY HH:mm") : ""
    }, // MMMM displays full name of month and HH 24 hour clock. If date is null display empty string
    {field: "activity", sortable: true, filter: true},
    {field: "duration", headerName: "Duration (min)", sortable: true, filter: true},
    {field: "customer", headerName: "Customer",
      cellRenderer: params => params.data.customer.firstname + " " + params.data.customer.lastname
    }
  ])

  const getTrainings = async () => {
    try {
      const response = await fetch(API_URL_TRAINING);
      const data = await response.json();
      setTrainings(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTrainings();
  }, [trainings])

  

  return (
    <>
      <div className="ag-theme-material" style={{height: 600, width: "90%", margin: "auto"}}>
        <AgGridReact
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
