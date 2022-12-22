import _ from "lodash";
import { useEffect, useState } from "react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend } from "recharts";
import Spinner from "./Spinner";
import useWindowSize from "../hooks/useWindowSize";

export default function Statistics({ trainings, containerRef }) {
  const [activities, setActivities] = useState([]);
  const { width } = useWindowSize(containerRef);
  
  const chartData = [];
  
  // Groups all activities by activity name and sets object to data variable
  const data = _.groupBy(activities, "activity");
  // maps data array and adds all durations to own new array got from sumBy function 
  const durations = Object.entries(data).map((item) => ((_.sumBy(item[1], i => i.duration))));;
  const activityNames = Object.keys(data);

  // adds durations and activitynames to chartData by looping.
  // values in durations and activityNames are in corresponding order
  for (let i = 0; i < activityNames.length; i++) {
    if (!activityNames[i]) continue; // continue to next iteration if activity is empty or null
    chartData.push({activity: activityNames[i], Duration: durations[i]});
  }

  // sets only activity and duration activities state
  useEffect(() => {
    const getActivities = () => {
      setActivities(trainings.map((t) => {
        return (
          {activity: t.activity, duration: t.duration}
        );
      }));
    }
    getActivities();
  }, [trainings])

  
  return (
    <>
    { chartData.length === 0 ? <Spinner /> :
      <BarChart width={width - 24} height={300} data={chartData} margin={{top: 20}} padding={{left: 10}}>
        <XAxis dataKey="activity"/>
        <YAxis label={{value: "Duration (min)", angle: -90, position: "insideLeft"}} />
        <Tooltip />
        <Legend verticalAlign="top"/>
        <Bar dataKey="Duration" fill="#8884d8" maxBarSize={150}/>
      </BarChart>
      }
    </>
  );
}