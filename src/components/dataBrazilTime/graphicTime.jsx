import 'chart.js/auto'
import {
  Chart as ChartsJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { generateGraphData } from '../../util/generate-graph-data';

import { Line } from "react-chartjs-2";

ChartsJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

export const initialOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Estatísticas periódicas do Brasil"
    }
  }
};

export default function GraphicTime({ data, options }) {
  return (
    <Line options={options} data={generateGraphData(data)} />
  )
}
