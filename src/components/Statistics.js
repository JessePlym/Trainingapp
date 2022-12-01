import { useEffect, useState } from "react";
import { BarChart, XAxis, YAxis, Bar } from "recharts";
import { API_URL_GETTRAINING } from "../constants";

export default function Statistics() {
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    getActivities();
  }, [])

  // sets only activity and duration from response data to activities state 
  const getActivities = () => {
    fetch(API_URL_GETTRAINING)
    .then(response => {
      if (response.ok) return response.json();
      else alert("something went wrong showing trainings")
    })
    .then(data => {
      setActivities(data.map((d) => {
        return (
          {name: d.activity, duration: d.duration}
        );
      }))

    })
    .catch(err => console.log(err));
  }

  return (
    <>
      {activities.length !== 0 && 
      <BarChart width={1100} height={300} data={activities}>
        <XAxis dataKey="name"/>
        <YAxis />
        <Bar dataKey="duration" fill="#8884d8"/>
      </BarChart>}
      
    </>
  );
}