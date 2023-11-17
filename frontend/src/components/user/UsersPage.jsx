import { useState } from "react";

function Users() {
  const [data] = useState([
    {
      id: "1",
      name: "Juan",
      email: "juan@gmail.com",
      phone: "123456789",
      address: "Calle 123",
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: "1",
      name: "Juan",
      email: "juan@gmail.com",
      phone: "123456789",
      address: "Calle 123",
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: "1",
      name: "Juan",
      email: "juan@gmail.com",
      phone: "123456789",
      address: "Calle 123",
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: "1",
      name: "Juan",
      email: "juan@gmail.com",
      phone: "123456789",
      address: "Calle 123",
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: "1",
      name: "Juan",
      email: "juan@gmail.com",
      phone: "123456789",
      address: "Calle 123",
      createdAt: new Date().toLocaleDateString(),
    },
  ]);

  return (
    <div>
      <div className="rounded-lg  border-gray-200 py-8 px-5 ">
        <h2 className="text-4xl mb-8 font-bold mt-8 ">Usuarios</h2>
        <div className="overflow-x-auto rounded-t-lg ">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right center">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Nombre
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Correo
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Telefono
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Direccion
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Creado el
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.phone}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.address}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.createdAt}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                      <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                        Edit
                      </button>

                      <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                        View
                      </button>

                      <button className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                        Delete
                      </button>
                    </span>
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

export default Users;
