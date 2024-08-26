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
import { useGetDashboard } from "../api";

import { Container, Table, TableData } from "@mantine/core";

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
  const { data } = useGetDashboard();

  const tableData: TableData = {
    head: ["Element position", "Atomic mass", "Symbol", "Element name"],
    body: [
      [6, 12.011, "C", "Carbon"],
      [7, 14.007, "N", "Nitrogen"],
      [39, 88.906, "Y", "Yttrium"],
      [56, 137.33, "Ba", "Barium"],
      [58, 140.12, "Ce", "Cerium"],
    ],
  };

  return (
    <Container size="xl">
      <h1 className="text-3xl font-bold">Dashboard Page</h1>
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
            <h2 className="mb-4 text-2xl font-semibold">Top 5 trung tâm</h2>
            <Table data={tableData} verticalSpacing="lg" striped />
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
