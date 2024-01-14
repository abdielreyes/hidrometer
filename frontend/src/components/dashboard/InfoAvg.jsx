import LineChart from "./RiverChart";
function InfoAvg({ data, config, homeFlag }) {
  const fixNumber = (num) => {
    if (fixNumber) {
      return num.toFixed(2);
    }
    return 0;
  };
  return (
    <div>
      <div className="">
        {homeFlag ? (
          <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Nivel actual
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              {fixNumber(data.current_avg)} {config.UNIT}
            </dd>
          </div>
        ) : null}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="rounded-lg  h-96 border pt-8 pb-8">
            <LineChart sensorData={data} />
          </div>
        </div>
        <div className="mt-8 mb-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Promedio mínimo
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {fixNumber(data.min_avg)} {config.UNIT}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Promedio
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {fixNumber(data.current_avg)} {config.UNIT}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Promedio máximo
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {fixNumber(data.max_avg)} {config.UNIT}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default InfoAvg;
