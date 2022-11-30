import { useEffect, useState } from "react";
import { API_URL_GETTRAINING } from "../constants";

export default function Statistics() {
  const [activities, setActivities] = useState([]);
  console.log(activities);
  
  useEffect(() => {
    getActivities();
  }, [])

  // TODO
  const getActivities = () => {
    fetch(API_URL_GETTRAINING)
    .then(response => {
      if (response.ok) return response.json();
      else alert("something went wrong showing trainings")
    })
    .then(data => {
      setActivities(data.map((d) => {
        return (
          {activity: d.activity, duration: d.duration}
        );
      }))

    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <div>{activities.length !== 0 ? activities[0].activity : "empty array" /* testing */}</div>
    </>
  );
}