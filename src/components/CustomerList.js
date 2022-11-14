import React, {useState, useEffect, useRef} from "react";
import { API_URL } from "../constants";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function CustomerList(props) {
  const [customers, setCustomers] = useState([]);
  const rowRef = useRef();

  const [columnDefs] = useState([
    {field: "firstname", sortable: true, filter: true},
    {field: "lastname", sortable: true, filter: true},
    {field: "streetaddress", sortable: true, filter: true},
    {field: "postcode", sortable: true, filter: true},
    {field: "city", sortable: true, filter: true},
    {field: "email", sortable: true, filter: true},
    {field: "phone", sortable: true, filter: true},
  ])

  useEffect(() => {
    getCustomers();
  }, [])
  
  const getCustomers = () => {
    fetch(API_URL)
    .then(response => { 
      if (response.ok) return response.json();
      else alert("something went wrong getting customers");
    })
    .then(data => setCustomers(data.content))
    .catch(err => console.log(err));
  }

  return (
    <>
      <div className="ag-theme-material" style={{height: 600, width: "90%", margin: "auto"}}>
        <AgGridReact
          ref={rowRef}
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          suppressCellFocus={true}
        />
      </div>  
    </>
  );
}