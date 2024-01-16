import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/variables";
import moment from "moment";

function HistoryAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Ajusta la cantidad de elementos por página según tus necesidades
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getAlerts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/alert/?page=${currentPage}&limit=${perPage}`
        );
        setAlerts(response.data.alerts);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener alertas", error);
      }
    };
    getAlerts();
  }, [currentPage, perPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="rounded-lg border-gray-200 py-8 px-10 lg:px-32">
        <h2 className="text-4xl mb-8 font-bold mt-8">
          Administración de Alertas
        </h2>
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left center">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Nivel de Alerta
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Promedio Actual
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Promedio Mínimo
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Promedio Máximo
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr key={alert._id}>
                  <td>{alert._id}</td>
                  <td>{alert.alert_level}</td>
                  <td>{alert.current_avg}</td>
                  <td>{alert.min_avg}</td>
                  <td>{alert.max_avg}</td>
                  <td>
                    {moment(alert.date).format("DD / MMM / YYYY HH:MM:SS")}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="rounded-b-lg border-t border-gray-200 px-4 py-2">
              <tr>
                <td colSpan="100%">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      className="btn rounded-sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      «
                    </button>
                    <p>Página {currentPage}</p>
                    <button
                      className="btn rounded-sm"
                      onClick={() => handlePageChange(currentPage + 1)}
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

export default HistoryAlerts;
