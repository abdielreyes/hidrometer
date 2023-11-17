import { useState } from "react";

function History() {
  const [data] = useState([
    {
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      sensor1: 4000,
      sensor2: 2400,
      sensor3: 2400,
    },
    {
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      sensor1: 4000,
      sensor2: 2400,
      sensor3: 2400,
    },
    {
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      sensor1: 4000,
      sensor2: 2400,
      sensor3: 2400,
    },
    {
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      sensor1: 4000,
      sensor2: 2400,
      sensor3: 2400,
    },
    {
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      sensor1: 4000,
      sensor2: 2400,
      sensor3: 2400,
    },
  ]);

  return (
    <div>
      <div className="rounded-lg  border-gray-200 py-8 px-5 ">
        <h2 className="text-4xl mb-8 font-bold mt-8 ">Historial de alertas</h2>
        <div className="overflow-x-auto rounded-t-lg ">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Fecha
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Hora
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Valor Sensor 1
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Valor Sensor 2
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Valor Sensor 3
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  {console.log(item)}
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.fecha}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.hora}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.sensor1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.sensor2}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.sensor3}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-center gap-1 text-xs font-medium">
            <li>
              <a
                href="#"
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                1
              </a>
            </li>

            <li className="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
              2
            </li>

            <li>
              <a
                href="#"
                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
              >
                4
              </a>
            </li>

            <li>
              <a
                href="#"
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default History;
