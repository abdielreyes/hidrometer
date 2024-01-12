import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/variables";
import axios from "axios";
import { toast } from "react-toastify";
import InfoAvg from "./InfoAvg";
import InfoSensor from "./InfoSensor";
import Spinner from "../ui/Spinner";
function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [avgData, setAvgData] = useState({
    min_avg: 0,
    current_avg: 0,
    max_avg: 0,
    flag: false,
  });
  const [sensors, setSensors] = useState([]);
  const [config, setConfig] = useState({});
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/sensor/`);
        console.log(res.data);
        setAvgData(res.data.total);
        setSensors(res.data.sensors);
        setConfig(res.data.config);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        console.error(error);
      }
    }, 2000);
    return () => clearInterval(interval);
  });
  useEffect(() => { }, []);
  return (
    <div>

      <div style={{ "margin-top": "-0px" }}>

        <Spinner loading={loading} />
      </div>
      <div className="px-10 lg:px-32 pt-10">
        <h2 className="text-4xl mb-8 font-bold mt-8 ">Panel de Monitoreo</h2>
        <InfoAvg data={avgData} config={config} />
        {sensors.map((sensor, index) => {
          return (
            <div key={index}>
              <div className="text-3xl font-bold ">Sensor {sensor.sensorId}</div>
              <InfoSensor key={index} data={sensor} config={config} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
