import { Container, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { formatDateTime } from "@/libs/helper";
import { Event } from "../types";
import Calendar from "../components/Calendar/Calendar";
import Dropdown from "../components/Dropdown";

export default function Booking() {
  // Modal
  const [opened, { open, close }] = useDisclosure(false);

  // Current event
  const [currentEvent, setCurrentEvent] = useState<Event>();

  // State courtId
  const [courtId, setCourtId] = useState("");

  // API data
  // const { data: events } = useGetBooking(courtId);
  const events: Event[] = [
    {
      title: "Sân Vip 1",
      start: new Date("2024-08-26T10:00:00"),
      end: new Date("2024-08-26T11:00:00"),
    },
    {
      title: "Sân Vip 2",
      start: new Date("2024-08-27T13:30:00"),
      end: new Date("2024-08-27T15:00:00"),
    },
    {
      title: "Sân Vip 3",
      start: new Date("2024-08-28T09:00:00"),
      end: new Date("2024-08-28T10:30:00"),
    },
    {
      title: "Sân Vip 4",
      start: new Date("2024-08-29T14:00:00"),
      end: new Date("2024-08-29T16:00:00"),
    },
    {
      title: "Sân Vip 5",
      start: new Date("2024-08-30T08:00:00"),
      end: new Date("2024-08-30T09:00:00"),
    },
    {
      title: "Sân Vip 6",
      start: new Date("2024-08-31T17:00:00"),
      end: new Date("2024-08-31T18:00:00"),
    },
    {
      title: "Sân Vip 7",
      start: new Date("2024-09-01T15:00:00"),
      end: new Date("2024-09-01T16:30:00"),
    },
  ];

  // Handle event click
  const handleEventClick = (clickInfo: any) => {
    const clickedEvent: Event = {
      title: clickInfo.event.title,
      start: clickInfo.event.start?.toISOString() || "",
      end: clickInfo.event.end?.toISOString() || "",
    };

    setCurrentEvent(clickedEvent);
    open();
  };

  return (
    <>
      <Container size="xl" className="mx-auto px-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-2xl font-bold text-gray-800">Quản lý đặt sân</h2>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-secondary">
                {events?.length} lịch đặt
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Đây là những lịch đặt của các sân</p>
          </div>
          <Dropdown setCourtId={setCourtId} courtId={courtId} />
        </div>

        <div className="mt-8 flex flex-col overflow-x-auto">
          <Calendar events={courtId && events ? events : []} handleEventClick={handleEventClick} />
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
