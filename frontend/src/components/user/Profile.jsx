import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utils/variables";
import axios from "axios";
import { toast } from "react-toastify";
import ModalConfirm from "../ui/ModalConfirm";
import { useNavigate } from "react-router-dom";
function Profile() {
  const [user, setUser] = useState({});
  const { handleSubmit, register, setValue } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    let token_user = localStorage.getItem("token");
    token_user = jwtDecode(token_user).user;
    setUser(token_user);
    setValue("name", token_user.name);
    setValue("phone", token_user.phone);
    setValue("postal_code", token_user.postal_code);
  }, [setValue]);
  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/api/user/`,
        { ...data, id: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success(
        "Usuario actualizado correctamente, inicia sesión nuevamente"
      );
      navigate("/logout");
    } catch (error) {
      console.error(error);

      toast.error("Error al actualizar el usuario");
    }
  };
  const deleteAccount = async () => {
    console.log("Borrando cuenta");
    try {
      const response = await axios.delete(`${BASE_URL}/api/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      toast.success(response.data.message);
      navigate("/logout");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center mt-20">
        <div className="bg-zinc-100 lg:w-3/5  w-5/6  rounded-lg shadow-lg lg:px-20 lg:py-10 px-4 py-4 -">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                {...register("name")}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Código Postal
              </label>
              <input
                {...register("postal_code")}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Número de teléfono
              </label>
              <input
                {...register("phone")}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="text"
                disabled
              />
            </div>

            <div className="text-center">
              <button
                className="btn btn-error text-white py-2 px-4   focus:outline-none  mb-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("modal_confirm").showModal();
                }}
              >
                Borrar Cuenta
              </button>
            </div>
            <div className="text-center">
              <button
                className=" text-white py-2 px-4 focus:outline-none btn btn-primary"
                type="submit"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
      <ModalConfirm
        confirm={deleteAccount}
        data={{
          title: "¿Estás seguro de borrar tu cuenta?",
          message: "Esta acción no se puede deshacer",
          button_accept: "Borrar Cuenta",
          button_decline: "Cancelar",
        }}
      />
    </div>
  );
}

export default Profile;
