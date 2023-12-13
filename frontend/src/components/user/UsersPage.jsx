import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/variables";
function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Cambia la URL según tu configuración del backend y la estructura de la API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/users-pagination?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
        // Ajusta según la respuesta de tu backend
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  // Funciones para manejar el cambio de página
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {/* ... Resto del componente ... */}
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
                  Código postal
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Número de teléfono
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
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.postal_code}</td>
                  <td>{user.phone}</td>
                  <td>{user.createdAt}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-primary rounded">Editar</button>
                    <button className="btn btn-error rounded">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="rounded-b-lg border-t border-gray-200 px-4 py-2">
              <tr>
                <td colSpan="100%">
                  {" "}
                  {/* Asegúrate de que el número en colSpan cubra todas las columnas de tu tabla */}
                  <div className="flex justify-center items-center space-x-2 ">
                    <button
                      className="btn rounded-sm"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      «
                    </button>
                    <button className="btn rounded-sm">
                      Página {currentPage}
                    </button>
                    <button
                      className="btn rounded-sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      »
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
