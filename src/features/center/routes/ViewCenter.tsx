import { IoIosAdd, IoIosInformationCircle } from "react-icons/io";
import { MdDataset } from "react-icons/md";
import { FaAddressBook, FaClock } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { Button, Container, Flex, Image, Text } from "@mantine/core";
import { useParams } from "react-router";
import { useGetCenter } from "../api";
import Description from "../components/Description";
import SectionTitle from "@/components/SectionTitle";
import CourtList from "@/features/court/components/CourtList";
import { Link } from "react-router-dom";

export default function CenterForm() {
  const { centerId } = useParams();
  const { data: center, isLoading } = useGetCenter(centerId ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!center) {
    return <div>Không tìm thấy trung tâm này</div>;
  }

  const centerInfo = [
    {
      icon: <FaAddressBook />,
      label: "Địa chỉ",
      value: center.address,
    },
    {
      icon: <MdDataset />,
      label: "Tỉnh/ Thành phố",
      value: center.province,
    },
    {
      icon: <IoIosInformationCircle />,
      label: "Quận",
      value: center.district,
    },
    {
      icon: <FaAddressBook />,
      label: "Phường",
      value: center.ward,
    },
    {
      icon: <FaClock />,
      label: "Thời gian ra mắt",
      value: center.createdAt,
    },
  ];

  return (
    <Container size="xl">
      <div className="flex gap-6 w-full p-3 bg-slate-100 rounded-2xl shadow-shadow-dropdown relative flex-col sm:flex-row sm:px-6 sm:py-4">
        <div className="flex gap-y-3 flex-col sm:min-w-[300px] sm:max-w-[300px] justify-between">
          <Image src={center.image} />
          <div className="flex flex-row gap-x-3  gap-y-3 sm:flex-col">
            <Button
              component={Link}
              to={`/dashboard/center/${center.id}/update`}
              className="py-[10px] flex-1"
              leftSection={<GrUpdate />}
            >
              Cập nhật
            </Button>
            {/* <Button className="py-[10px] flex-1" bg="red" leftSection={<AiFillDelete />}>
              Xóa
            </Button> */}
          </div>
        </div>

        <div>
          <h1 className="text-[26px] font-bold mb-6">{center.courtCenterName}</h1>
          <div className="flex flex-col gap-3 text-md">
            {centerInfo.map(({ icon, label, value }) => (
              <div className="flex items-center gap-2" key={label}>
                {icon} {label}:<Text fw="600">{value}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-between gap-y-2 mt-10">
        <div className="flex flex-col gap-y-2 w-full font-medium text-black text-sm sm:w-[calc(100%-146px)] sm:gap-y-3 mx-auto">
          <SectionTitle>Mô tả</SectionTitle>
          <Description />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-10">
        <Flex justify="space-between" align="center" mb="xl">
          <SectionTitle className="mb-0">Các sân của trung tâm này</SectionTitle>
          <Button
            component={Link}
            to={`/dashboard/center/${centerId}/court/create`}
            radius="md"
            leftSection={<IoIosAdd size={24} />}
          >
            Tạo sân mới
          </Button>
        </Flex>

        <CourtList />
      </div>
    </Container>
  );
}
