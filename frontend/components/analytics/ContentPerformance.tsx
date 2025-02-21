import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ContentPerformance = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Engagement Rate (%)",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="p-6 bg-card dark:bg-darkCard shadow-modern rounded-xl">
      <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        📊 Content Performance
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default ContentPerformance;
