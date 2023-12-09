import { useEffect, useState } from "react";
import LineChart from "./RiverChart";
import { BASE_URL } from "../utils/variables";
import axios from "axios";
import { toast } from "react-toastify";
import InfoAvg from "./InfoAvg";
import InfoSensor from "./InfoSensor";
function Dashboard() {
  const [avgData, setAvgData] = useState({
    min_avg: 0,
    current_avg: 0,
    max_avg: 0,
    flag: false
  });
  const [sensors, setSensors] = useState([]);
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/sensor/`);
        console.log(res.data);
        setAvgData(res.data.total);
        setSensors(res.data.sensors);
      } catch (error) {
        toast.error(error.response.data.message);
        console.error(error)
      }
    }, 2000);
    return () => clearInterval(interval);
  });
  useEffect(() => { }, []);
  return (
    <div className="px-8">
      <h2 className="text-4xl mb-8 font-bold mt-8 ">Dashboard</h2>
      <InfoAvg data={avgData} />
      {
        sensors.map((sensor, index) => {
          return <div>
            sensor {index}

            <InfoSensor key={index} data={sensor} />

          </div>
        })
      }

    </div>
  );
}

export default Dashboard;
