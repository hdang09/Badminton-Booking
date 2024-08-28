import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";
import { Event } from "../../types";
import { formatTime } from "@/libs/helper";

export default function Calendar({
  handleEventClick,
  events,
}: {
  handleEventClick: any;
  events: Event[];
}) {
  const renderEventContent = (eventInfo: any) => (
    <div className="py-1 px-2 flex justify-center items flex-col">
      <strong className="text-black">{eventInfo.event.title}</strong>
      {eventInfo.event.end && (
        <div className="text-xs text-black">
          {formatTime(eventInfo.event.start)} - {formatTime(eventInfo.event.end)}
        </div>
      )}
    </div>
  );

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      events={events}
      eventClick={handleEventClick}
      eventContent={renderEventContent}
      locale={viLocale}
      droppable={true}
      headerToolbar={{
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      buttonText={{
        today: "Hôm nay",
        month: "Tháng",
        week: "Tuần",
        day: "Ngày",
      }}
      height="auto"
      slotMinTime="06:00:00"
      slotMaxTime="22:00:00"
    />
  );
}
