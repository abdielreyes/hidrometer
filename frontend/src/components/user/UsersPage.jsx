import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/variables";
import moment from "moment";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import ModalConfirm from "../ui/ModalConfirm";
import { toast } from "react-toastify";
import ModalEdit from "../ui/ModalEdit";
function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(false);
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
        setCurrentPage(response.data.currentPage);

        // Ajusta según la respuesta de tu backend
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, [currentPage, refresh]);

  // Funciones para manejar el cambio de página
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleEdit = (id) => (e) => {
    e.preventDefault();
    setSelectedId(id);
    document.getElementById("modal_edit").showModal();
  };
  const deleteAccount = async () => {
    console.log(selectedId);
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/user/${selectedId}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* ... Resto del componente ... */}
      <div className="rounded-lg  border-gray-200 py-8 px-10  lg:px-32 ">
        <h2 className="text-4xl mb-8 font-bold mt-8 ">
          Administración de Usuarios
        </h2>
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
                  Rol
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
                  <td>{user.role}</td>
                  <td>{moment(user.created_at).format("DD / MMM / YYYY")}</td>
                  <td className="flex  ">
                    <button
                      className="flex-auto "
                      onClick={handleEdit(user._id)}
                    >
                      <FaPencil className="hover:bg-slate-300 m-1 p-2 text-3xl rounded text-black bg-slate-100" />
                    </button>
                    <button
                      className="flex-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedId(user._id);
                        document.getElementById("modal_confirm").showModal();
                      }}
                    >
                      <FaTrashAlt className="hover:bg-slate-300 m-1 p-2 text-3xl rounded text-black bg-slate-100" />
                    </button>
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
                    <p>Página {currentPage}</p>
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
      </div>{" "}
      <ModalConfirm
        confirm={deleteAccount}
        data={{
          title: "¿Estás seguro de borrar la cuenta?",
          message: "Esta acción no se puede deshacer",
          button_accept: "Borrar Cuenta",
          button_decline: "Cancelar",
        }}
      />
      <ModalEdit
        data={{
          title: "Editar Usuario",
          user_id: selectedId,
          button_accept: "Guardar",
          button_decline: "Cancelar",
        }}
      />
    </div>
  );
}

export default Users;
