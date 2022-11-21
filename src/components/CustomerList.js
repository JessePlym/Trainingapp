import React, {useState, useEffect, useRef} from "react";
import { API_URL_CUSTOMER } from "../constants";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";

export default function CustomerList(props) {
  const [customers, setCustomers] = useState([]);
  const rowRef = useRef();

  const [columnDefs] = useState([
    {field: "firstname", sortable: true, filter: true, width: 140},
    {field: "lastname", sortable: true, filter: true, width: 140},
    {field: "streetaddress", sortable: true, filter: true},
    {field: "postcode", sortable: true, filter: true, width: 140},
    {field: "city", sortable: true, filter: true, width: 140},
    {field: "email", sortable: true, filter: true},
    {field: "phone", sortable: true, filter: true},
  ])

  useEffect(() => {
    getCustomers();
  }, [])
  
  const getCustomers = () => {
    fetch(API_URL_CUSTOMER)
    .then(response => { 
      if (response.ok) return response.json();
      else alert("something went wrong getting customers");
    })
    .then(data => setCustomers(data.content))
    .catch(err => console.log(err));
  }

  const addCustomer = (customer) => {
    fetch(API_URL_CUSTOMER, {
      method: "POST",
      headers: {"Content-type" : "application/json"},
      body: JSON.stringify(customer)
    })
    .then(response => {
      if (response.ok) getCustomers();
      else alert("something went wrong adding customer"); 
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <AddCustomer addCustomer={addCustomer}/>
      <div className="ag-theme-material" style={{height: 550, width: "100%", margin: "auto"}}>
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