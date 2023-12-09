import { useState } from "react";
function HomePage() {
  const initialState = {
    alert_level: 0,
    alert_message: "",
    avg: 0,
    max: 0,
    min: 0,
  };
  const [state, setState] = useState(initialState);
  return (
    <div>
      <div className="flex flex-col">
        <div className=" rounded-lg bg-gray-200 w-5/6">
          <div className="flex  align-middle items-center justify-center ">
            <ul className="steps steps-vertical">
              <li className="step">Purchase</li>
              <li className="step">Receive Product</li>
              <li className="step step-primary">Register</li>
              <li className="step step-primary">Choose plan</li>
            </ul>
          </div>
        </div>
        <div className=" w-5/6 rounded-lg ">
          <dl className="flex gap-x-3 h-screen ">
            <div className="flex flex-auto flex-col rounded-lg border border-gray-100 m-auto px-4 py-8 h-1/6  text-center bg-zinc-100">
              <dt className="order-last text-lg font-medium text-gray-500">
                Min
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {state.min} m
              </dd>
            </div>

            <div className="flex flex-auto flex-col rounded-lg border border-gray-100 m-auto px-4 py-8 text-center bg-zinc-100 h-1/6">
              <dt className="order-last text-lg font-medium text-gray-500">
                Avg
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {state.avg} m
              </dd>
            </div>

            <div className="flex flex-auto flex-col rounded-lg border border-gray-100 m-auto px-4 py-8 text-center bg-zinc-100 h-1/6">
              <dt className="order-last text-lg font-medium text-gray-500">
                Max
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                {state.max} m
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
