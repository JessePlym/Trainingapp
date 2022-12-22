import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import useWindowSize from "../hooks/useWindowSize";

export default function Calendar({ trainings, containerRef }) {
  const { height } = useWindowSize(containerRef);

  return (
    <>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin ]}
        initialView="dayGridMonth"
        height={height}
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