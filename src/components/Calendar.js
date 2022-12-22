import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";

export default function Calendar({ trainings }) {

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
        events={trainings.map((event) => {
          return ({
            title: event.customer ? `${event.activity} / ${event.customer.firstName} ${event.customer.lastName}`: "",
            start: event.date ? event.date : "",
            end: event.date ? dayjs(event.date).utc(true).add(event.duration, "minutes").toISOString() : ""
          })
        }
        )}
      />
    </>
  );
}