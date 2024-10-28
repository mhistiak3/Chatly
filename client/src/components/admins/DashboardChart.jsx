import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  Chart as ChartJS,
  ArcElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  PointElement,
} from "chart.js";
import { primaryColor, seconderyColor } from "../../constants/colors";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  PointElement
);

const lineChartIptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
const labels = getLast7Days().reverse();

export const LineChart = () => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: [11, 2, 3, 55, 5, 66, 7, 8, 9, 10, 52],
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderColor: "rgba(0, 0, 0, 1)",
        // fill: true,
      },
    ],
  };
  return <Line data={data} options={lineChartIptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
};

export const DoughnutChart = ({ value = [] }) => {
   const data = {
     labels: ["Single Chat", "Group Chat"],
     datasets: [
       {
         data: value,
         backgroundColor: [primaryColor, seconderyColor],
         borderColor: [primaryColor, seconderyColor],
         borderWidth: 2,
         hoverBackgroundColor: [primaryColor + "b0", seconderyColor + "b0"], 
         offset:40
       },
     ],
   };
  return <Doughnut data={data} options={doughnutChartOptions} />;
};
