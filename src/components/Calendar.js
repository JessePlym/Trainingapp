import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { API_URL_GETTRAINING } from "../constants";

export default function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, [])


  const getEvents = () => {
    fetch(API_URL_GETTRAINING)
    .then(response => {
      if (response.ok) return response.json();
      else alert("something went wrong showing trainings")
    })
    .then(data => setEvents(data))
    .catch(err => console.log(err));
  }

 

  return (
    <>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin ]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today,prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        timeZone="utc"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }}
        events={events.map((event) => {
          return ({
            title: event.customer !== null ? `${event.activity} / ${event.customer.firstname} ${event.customer.lastname}`: "",
            start: event.date !== null ? event.date : ""
          })
        }
        )}
      />
    </>
  );
}