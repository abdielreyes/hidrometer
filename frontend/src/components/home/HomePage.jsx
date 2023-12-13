import { useState } from "react";
import { BASE_URL } from "../utils/variables";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const initialDataState = {
  alert_level: null,
  avg: 0,
  max: 0,
  min: 0,
  current: 10,
};
const initialConfigState = {
  LEVEL_ALERT_MAX: 0,
  LEVEL_ALERT_MID: 0,
  LEVEL_ALERT_MIN: 0,
  UNIT: "cm",
};
function HomePage() {
  const [data, setData] = useState(initialDataState);
  const [config, setConfig] = useState({ initialConfigState });
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(BASE_URL + "/api/sensor/");
        console.log(response.data);
        setData(response.data.total);
        setConfig(response.data.config || {});
      } catch (error) {
        toast.error(
          "Error en la conexión con el servidor, intenta de nuevo más tarde."
        );
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const fixNumber = (number) => {
    if (number == null) {
      return 0;
    }
    return number.toFixed(2);
  };
  return (
    <div>
      <div className="flex-row ">
        <div className="flex-auto h-1/2 ">
          <div className="flex flex-col  align-middle items-center justify-center bg-content w-fit m-auto p-10">
            <h3 className="text-3xl font-bold">Nivel del agua</h3>
            <ul className="steps steps-vertical text-2xl z-0">
              <li
                data-content="✕"
                className={
                  "step " + (data.alert_level == 2 ? "step-error" : "")
                }
              >
                <div className="inline-flex items-baseline">
                  Alto
                  <div className="text-sm">
                    &nbsp;(&gt;{config.LEVEL_ALERT_MAX}&nbsp;{config.UNIT})
                  </div>
                </div>
              </li>
              <li
                data-content="!"
                className={
                  "step " +
                  (data.alert_level == 2
                    ? "step-error"
                    : data.alert_level == 1
                    ? "step-warning"
                    : "")
                }
              >
                <div className="inline-flex items-baseline">
                  Medio
                  <div className="text-sm">
                    &nbsp;(&gt;{config.LEVEL_ALERT_MID}&nbsp;{config.UNIT})
                  </div>
                </div>
              </li>
              <li
                data-content="✓"
                className={
                  "step " +
                  (data.alert_level == 2
                    ? "step-error"
                    : data.alert_level == 1
                    ? "step-warning"
                    : data.alert_level == 0
                    ? "step-success"
                    : "")
                }
              >
                <div className="inline-flex items-baseline">
                  Bajo
                  <div className="text-sm">
                    &nbsp;(&gt;{config.LEVEL_ALERT_MIN}&nbsp;{config.UNIT})
                  </div>
                </div>
              </li>
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
                {fixNumber(data.current_avg) + " " + config.UNIT}
              </dd>
            </div>
          </dl>
          <dl className="flex flex-row gap-x-3">
            <div className="flex flex-auto flex-col rounded-lg border border-gray-100  px-4 py-8 text-center bg-zinc-100 h-1/6">
              <dt className="order-last text-lg font-medium text-gray-500">
                Altura máxima
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {fixNumber(data.max_avg) + " " + config.UNIT}
              </dd>
            </div>
          </dl>
          <dl className="flex flex-row gap-x-3">
            <div className="flex flex-auto flex-col rounded-lg border border-gray-100  px-4 py-8 text-center bg-zinc-100 h-1/6">
              <dt className="order-last text-lg font-medium text-gray-500">
                Altura mínima
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {fixNumber(data.min_avg) + " " + config.UNIT}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
