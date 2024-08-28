import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import {
  MdOutlineCampaign,
  MdOutlineLibraryAddCheck,
  MdOutlinePeopleAlt,
  MdOutlineSchool,
  MdOutlineTrendingDown,
  MdOutlineTrendingUp,
} from "react-icons/md";
import DoughnutChart from "../components/DoughnutChart";

import { Container, Table } from "@mantine/core";
import CustomTable from "@/components/CustomTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
);

const icons = [
  <MdOutlineSchool key="school" />,
  <MdOutlinePeopleAlt key="people" />,
  <MdOutlineLibraryAddCheck key="library" />,
  <MdOutlineCampaign key="campaign" />,
];

export default function Page() {
  // Get all reports
  // const { data } = useGetDashboard();
  const data = {
    reports: [
      {
        title: "Tổng trung tâm",
        total: 5,
        isIncrease: true,
        percentage: 25,
      },
      {
        title: "Tổng sân",
        total: 6,
        isIncrease: false,
        percentage: 10,
      },
      {
        title: "Tổng lịch đặt",
        total: 10,
        isIncrease: true,
        percentage: 50,
      },
      {
        title: "Tổng doanh thu",
        total: 1600,
        isIncrease: false,
        percentage: 5,
      },
    ],
    top5Centers: [
      {
        id: 1,
        courtCenterName: "Trung tâm Hà Nội",
        province: "Hà Nội",
      },
      {
        id: 2,
        courtCenterName: "Trung tâm Đà Nẵng",
        province: "Đà Nẵng",
      },
      {
        id: 3,
        courtCenterName: "Trung tâm Bình Dương",
        province: "Bình Dương",
      },
      {
        id: 4,
        courtCenterName: "Trung tâm Hồ Chí Minh",
        province: "Hồ Chí Minh",
      },
      {
        id: 5,
        courtCenterName: "Trung tâm Hải Phòng",
        province: "Hải Phòng",
      },
    ],
    countCourtByCenter: {
      labels: ["Trung tâm Hà Nội", "Trung tâm Đà Nẵng", "Trung tâm Bình Dương"],
      data: [5, 4, 8],
    },
  };

  const headers = ["STT", "Tên sân", "Địa chỉ"];

  const rows =
    data?.top5Centers?.map((element) => (
      <Table.Tr key={element.id}>
        <Table.Td>{element.id}</Table.Td>
        <Table.Td>{element.courtCenterName}</Table.Td>
        <Table.Td>{element.province}</Table.Td>
      </Table.Tr>
    )) || [];

  return (
    <Container size="xl">
      <h1 className="text-3xl font-bold">Trang thống kê</h1>
      <div className="mt-6">
        <div className="mb-6 grid grid-cols-4 gap-6">
          {data?.reports?.map((report, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-1 flex items-center gap-2 text-slate-400">
                {icons[index]} <span>{report.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-semibold">{report.total}</span>
                <span
                  className={`flex items-center gap-2 rounded-full px-2 font-semibold ${
                    report.isIncrease ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                  }`}
                >
                  {report.isIncrease ? <MdOutlineTrendingUp /> : <MdOutlineTrendingDown />}{" "}
                  {report.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Trung tâm nổi bật</h2>
            {data?.top5Centers && <CustomTable headers={headers} rows={rows} />}
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Thống kê sân</h2>
              <p className="text-slate-400">Tổng số sân theo từng trung tâm</p>
            </div>
            {data?.countCourtByCenter && (
              <DoughnutChart countCourtByCenter={data?.countCourtByCenter} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
