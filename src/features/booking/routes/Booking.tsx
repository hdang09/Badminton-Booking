import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";
import { Container, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { formatDateTime, formatTime } from "@/libs/helper";

interface Event {
  title: string;
  start: string;
  end: string;
}

export default function Booking() {
  // Modal
  const [opened, { open, close }] = useDisclosure(false);

  const events: Event[] = [
    { title: "Sân Vip 1", start: "2024-08-26T10:00:00", end: "2024-08-26T11:00:00" },
    { title: "Sân Vip 2", start: "2024-08-27T13:30:00", end: "2024-08-27T15:00:00" },
    { title: "Sân Vip 3", start: "2024-08-28T09:00:00", end: "2024-08-28T10:30:00" },
    { title: "Sân Vip 4", start: "2024-08-29T14:00:00", end: "2024-08-29T16:00:00" },
    { title: "Sân Vip 5", start: "2024-08-30T08:00:00", end: "2024-08-30T09:00:00" },
    { title: "Sân Vip 6", start: "2024-08-31T17:00:00", end: "2024-08-31T18:00:00" },
    { title: "Sân Vip 7", start: "2024-09-01T15:00:00", end: "2024-09-01T16:30:00" },
  ];

  // Current event
  const [currentEvent, setCurrentEvent] = useState<Event>();

  console.log(currentEvent);
  const handleEventClick = (clickInfo: any) => {
    const clickedEvent: Event = {
      title: clickInfo.event.title,
      start: clickInfo.event.start?.toISOString() || "",
      end: clickInfo.event.end?.toISOString() || "",
    };
    setCurrentEvent(clickedEvent);

    open();
  };

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
    <>
      <Container size="xl">
        <Text size="lg" fw="700" className="text-2xl">
          Quản lý đặt sân
        </Text>
        <div className="mt-12">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={events}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            locale={viLocale} // Set the locale to Vietnamese
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
        </div>
      </Container>

      <Modal opened={opened} onClose={close} title={currentEvent?.title}>
        <div className="py-2 px-8">
          <Text size="lg" className="text-2xl mb-4 font-semibold">
            Tên sân: {currentEvent?.title}
          </Text>
          <Text size="md" className="text-gray-600">
            Thời gian bắt đầu: <strong>{formatDateTime(currentEvent?.start)}</strong>
          </Text>
          <Text size="md" className="text-gray-600">
            Thời gian kết thúc: <strong>{formatDateTime(currentEvent?.end)}</strong>
          </Text>
        </div>
      </Modal>
    </>
  );
}
