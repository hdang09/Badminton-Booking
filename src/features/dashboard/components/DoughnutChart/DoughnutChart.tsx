import { Doughnut } from "react-chartjs-2";
import { Chart } from "../../types";

const CHART_COLORS = [
  "rgb(0, 88, 255)",
  "rgb(249, 151, 0)",
  "rgb(255, 199, 0)",
  "rgb(32, 214, 152)",
];

const DoughnutChart = ({ countCourtByCenter }: { countCourtByCenter: Chart }) => {
  const START_INDEX = 0;
  const MAX_NUMBER = 4;

  const data = {
    backgroundColor: CHART_COLORS,
    labels: countCourtByCenter?.labels?.slice(START_INDEX, MAX_NUMBER),
    datasets: [
      {
        label: "My First Dataset",
        data: countCourtByCenter?.data?.slice(START_INDEX, MAX_NUMBER),
        backgroundColor: CHART_COLORS,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    elements: {
      arc: {
        weight: 0.5,
        borderWidth: 3,
      },
    },
    cutout: 75,
  };
  return <Doughnut data={data} width={50} height={50} options={options} />;
};

export default DoughnutChart;
