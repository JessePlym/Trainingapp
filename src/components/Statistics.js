import _ from "lodash";
import { useEffect, useState } from "react";
import { BarChart, XAxis, YAxis, Bar } from "recharts";
import { API_URL_GETTRAINING } from "../constants";
import Spinner from "./Spinner";

export default function Statistics() {
  const [activities, setActivities] = useState([]);
  
  const chartData = [];
  // Groups all activities by activity name and sets object to data variable
  const data = _.groupBy(activities, "activity");
  const durations = [];
  const activityNames = Object.keys(data);
  // loops through each item in data array and adds all durations to own array got from sumBy function 
  Object.entries(data).forEach((item) => {
    durations.push((_.sumBy(item[1], i => i.duration)));
  });
  //console.log(data);
  console.log(durations);
  console.log(activityNames);
  
  // adds durations and activitynames to chartData by looping.
  // values in durations and activityNames are in corresponding order
  for (let i = 0; i < activityNames.length; i++) {
    chartData.push({activity: activityNames[i], duration: durations[i]});
  }

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
          {activity: d.activity, duration: d.duration}
        );
      }))

    })
    .catch(err => console.log(err));
  }

  return (
    <>
    { chartData.length === 0 ? <Spinner /> :
      <BarChart width={1100} height={300} data={chartData}>
        <XAxis dataKey="activity"/>
        <YAxis />
        <Bar dataKey="duration" fill="#8884d8"/>
      </BarChart>
      }
    </>
  );
}