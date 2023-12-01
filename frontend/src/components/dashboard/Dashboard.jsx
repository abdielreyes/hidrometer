import { useEffect, useState } from "react";
import LineChart from "./RiverChart";
import { BASE_URL } from "../utils/variables";
function Dashboard() {
  const [data, setData] = useState({
    min: 0,
    avg: 0,
    max: 0,
    current: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${BASE_URL}/api/sensor/`)
        .then((res) => res.json())
        .then((res) => {
          const sensor = res.sensor1;
          console.log(sensor);
          setData(sensor);
        });
    }, 2000);
    return () => clearInterval(interval);
  });
  useEffect(() => {}, []);
  return (
    <div className="px-8">
      <h2 className="text-4xl mb-8 font-bold mt-8 ">Dashboard</h2>
      <div className="">
        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Actual
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            {data.current} m
          </dd>
        </div>{" "}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="rounded-lg  h-96 border pt-8 pb-8">
            <LineChart sensorData={data} />
          </div>
        </div>
        <div className="mt-8 mb-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Min
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {data.min} m
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Avg
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {data.avg} m
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Max
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {data.max} m
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
