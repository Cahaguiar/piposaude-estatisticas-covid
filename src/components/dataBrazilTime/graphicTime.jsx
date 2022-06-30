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

ChartsJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
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

const labels = ["7 DIAS", "15 DIAS"];

export const data = {
  labels,
  datasets: [
    {
      label: "Casos",
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      data: [33, 53, 85, 41, 44, 65],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)"
    },
    {
      label: "Óbitos",
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      data: [2, 15, 81, 31, 21, 70],
      borderColor: "rgb(237, 150, 80)",
      backgroundColor: "rgba(237, 150, 80, 0.2)"
      
    },
    {
      label: "Suspeitas",
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      data: [33, 25, 35, 51, 54, 76],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.2)"
    }
  ]
}
 





/* const graphicTime = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  
  const [chartOptions, setChartOptions ] = useState({})

  useEffect(() => {
    setChartData({
      labels: ["7 DIAS", "15 DIAS"],
      datasets: [
        {
          label: "Casos",
          data: [12, 55, 34, 23, 720],
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    });
    setChartOptions({
      resposive: true,
      pluggins: {
        legend: {
          position: "top"
        }
      }
    })
  }, []);
  
  return (
    <Line options={chartOptions} data={chartData} />
  )
}

export default graphicTime */