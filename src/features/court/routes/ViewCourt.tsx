import { IoFastFood } from "react-icons/io5";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaParking } from "react-icons/fa";
import { Button, Container, Image } from "@mantine/core";
import { useParams } from "react-router";
import { GrUpdate, GrWifi } from "react-icons/gr";
import { useGetCourt } from "../api";
import SectionTitle from "@/components/SectionTitle";
import CourtList from "../components/CourtList";
import { numberToPrice } from "@/libs/helper";
import { Link } from "react-router-dom";

export default function ViewCourt() {
  const { courtId, centerId } = useParams();
  const { data: court, isLoading } = useGetCourt(centerId ?? "", courtId ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!court) {
    return <div>Không tìm thấy sân này</div>;
  }

  const SERVICES = [
    {
      id: 1,
      name: "Wi-Fi",
      icon: <GrWifi />,
    },
    {
      id: 3,
      name: "Trà đá",
      icon: <RiDrinks2Fill />,
    },
    {
      id: 4,
      name: "Đồ ăn",
      icon: <IoFastFood />,
    },
    {
      id: 5,
      name: "Bãi đỗ xe",
      icon: <FaParking />,
    },
  ];

  return (
    <Container size="xl">
      <div className="flex gap-6 w-full p-3 relative flex-col sm:flex-row sm:px-6 sm:py-4">
        <Image src={court.image} maw="700px" radius="md" />

        <div className="rounded bg-slate-50 flex-1 p-4">
          <SectionTitle>Thông tin sân</SectionTitle>
          <div className="flex gap-3 text-md mb-4">
            Tên sân: <strong className="flex-1 text-right">{court.courtName}</strong>
          </div>
          <div className="flex gap-3 text-md mb-4">
            Tạo bởi: <strong className="flex-1 text-right">{court.updatedBy}</strong>
          </div>
          <div className="flex gap-3 text-md mb-4">
            Giá tiền:{" "}
            <strong className="flex-1 text-right">{numberToPrice(court.pricePerSlot)}</strong>
          </div>
          <div className="flex flex-col gap-3 text-md mb-4">
            Dịch vụ tiện ích:
            <div className="flex flex-wrap gap-3">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="flex gap-2 rounded bg-slate-200 py-2 px-4 items-center"
                >
                  {service.icon}
                  <span>{service.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-x-3 gap-y-3 sm:flex-col mt-8">
            <Button
              component={Link}
              to={`/dashboard/center/${centerId}/court/${courtId}/update`}
              className="py-[10px] flex-1"
              leftSection={<GrUpdate />}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-10">
        <SectionTitle>Các sân tương tự</SectionTitle>
        <CourtList />
      </div>
    </Container>
  );
}
