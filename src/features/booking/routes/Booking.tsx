import { Container, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { formatDateTime } from "@/libs/helper";
import { useGetBooking } from "../api";
import { Event } from "../types";
import { useGetListCenter } from "@/features/center/api";
import Calendar from "../components/Calendar/Calendar";
import Dropdown from "../components/Dropdown";

export default function Booking() {
  // Modal
  const [opened, { open, close }] = useDisclosure(false);

  const { data: events } = useGetBooking();

  // Current event
  const [currentEvent, setCurrentEvent] = useState<Event>();

  const { data: centers } = useGetListCenter();

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
          {centers && <Dropdown centers={centers} />}
        </div>

        <div className="mt-8 flex flex-col overflow-x-auto">
          {events && <Calendar events={events} handleEventClick={handleEventClick} />}
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
