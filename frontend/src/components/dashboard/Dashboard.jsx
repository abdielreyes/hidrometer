import { useEffect, useState } from "react";
import LineChart from "./RiverChart";

function Dashboard() {
  const [data, setData] = useState([0, 0, 0]);
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setData([
        getRandomInt(0, 30),
        getRandomInt(30, 60),
        getRandomInt(60, 100),
      ]);
    }, 3000);
    return () => clearInterval(interval);
  });
  return (
    <div className="px-8">
      <h2 className="text-4xl mb-8 font-bold mt-8 ">Dashboard</h2>
      <div className="">
        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Actual
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            {data[1]} m
          </dd>
        </div>{" "}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="rounded-lg  h-96 border pt-8 pb-8">
            <LineChart />
          </div>
        </div>
        <div className="mt-8 mb-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Min
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {data[0]} m
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Avg
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {data[1]} m
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Max
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {data[2]} m
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
