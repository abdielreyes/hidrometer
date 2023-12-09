import { useState } from "react";
import { BASE_URL } from "../utils/variables";
import { useEffect } from "react";
import axios from "axios";
const initialState = {
  alert_level: null,
  avg: 0,
  max: 0,
  min: 0,
  current: 10,
};
function HomePage() {
  const [data, setData] = useState(initialState);
  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await axios.get(BASE_URL + "/api/sensor/")
      setData(response.data.total)
    }
      , 1000);
    return () => clearInterval(interval);
  }
    , []);

  return (
    <div>
      <div className="flex-row ">
        <div className="flex-auto h-1/2 ">
          <div className="flex flex-col  align-middle items-center justify-center bg-content w-fit m-auto p-10">
            <h3 className="text-3xl font-bold">Nivel del agua</h3>
            <ul className="steps steps-vertical text-2xl z-0">
              <li data-content="✕" className={"step " + (data.alert_level == 2 ? "step-error" : "")}>Nivel alto</li>
              <li data-content="!" className={"step " + (data.alert_level == 2 ? "step-error" : (data.alert_level == 1 ? "step-warning" : ""))}>Nivel medio</li>
              <li data-content="✓" className={"step " + (data.alert_level == 2 ? "step-error" : (data.alert_level == 1 ? "step-warning" : (data.alert_level == 0 ? "step-success" : "")))}>Nivel bajo</li>

            </ul>
          </div>
        </div>
        <div className="flex-auto flex-col flex-wrap  align-middle lg:w-2/4 m-auto">
          <dl className="flex flex-row gap-x-3">
            <div className="flex flex-auto flex-col rounded-lg border border-gray-100  px-4 py-8 text-center bg-zinc-100 h-1/6">
              <dt className="order-last text-lg font-medium text-gray-500">
                Altura promedio
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {data.current_avg} m
              </dd>
            </div>
          </dl>
          <dl className="flex flex-row gap-x-3">
            <div className="flex flex-auto flex-col rounded-lg border border-gray-100  px-4 py-8 text-center bg-zinc-100 h-1/6">
              <dt className="order-last text-lg font-medium text-gray-500">
                Altura máxima
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {data.max_avg} m
              </dd>
            </div>
          </dl>
          <dl className="flex flex-row gap-x-3">
            <div className="flex flex-auto flex-col rounded-lg border border-gray-100  px-4 py-8 text-center bg-zinc-100 h-1/6">
              <dt className="order-last text-lg font-medium text-gray-500">
                Altura mínima
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {data.min_avg} m
              </dd>
            </div>
          </dl>
        </div>

      </div >
    </div >
  );
}

export default HomePage;
