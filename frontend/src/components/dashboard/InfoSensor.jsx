import LineChart from "./RiverChart";

function InfoAvg({ data, config }) {
  const toFixed = (num) => {
    if (num == 0) {
      return num;
    }
    if (num) {
      return num.toFixed(2);
    }
  };
  return (
    <div>
      <div className="">
        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Actual
          </dt>

          <dd className="text-4xl font-extrabold text-gray-500 md:text-5xl">
            {toFixed(data.current)} {config.UNIT}
          </dd>
        </div>{" "}
        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Sensor de contacto
          </dt>

          <dd className="text-4xl font-extrabold text-zinc-200 md:text-5xl">
            {data.flag ? (
              <input
                type="checkbox"
                className="toggle toggle-error"
                disabled
                checked
              />
            ) : (
              <input type="checkbox" className="toggle toggle-error" disabled />
            )}
          </dd>
        </div>
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

              <dd className="text-4xl font-extrabold text-gray-600 md:text-5xl">
                {toFixed(data.min)} {config.UNIT}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Promedio
              </dt>

              <dd className="text-4xl font-extrabold text-gray-600 md:text-5xl">
                {toFixed(data.min)} {config.UNIT}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Max
              </dt>

              <dd className="text-4xl font-extrabold text-gray-600 md:text-5xl">
                {toFixed(data.max)} {config.UNIT}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default InfoAvg;
