import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/variables";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
function ModalEdit({ data, refresh, setRefresh }) {
  const closeModal = () => {
    document.getElementById("modal_edit").close();
  };
  const [user, setUser] = useState({
    _id: "",
    name: "",
    phone: "",
    postal_code: "",
    role: "",
  });
  const { handleSubmit, register } = useForm();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          BASE_URL + "/api/user/" + data.user_id
        );
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (data.user_id) fetchUser();
  }, [data.user_id]);
  const onSubmit = async (data, e) => {
    e.preventDefault();
  };
  const updateUser = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/user/`,
        { ...user, id: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success("Usuario actualizado correctamente");
      setRefresh(!refresh);
      closeModal();
    } catch (error) {
      console.error(error);

      toast.error("Error al actualizar el usuario");
    }
  };
  return (
    <div>
      <dialog id="modal_edit" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{data.title}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="form-control">
            {/* register your input into the hook by invoking the "register" function */}
            <label className="label" htmlFor="_id">
              _id
            </label>
            <input
              className="input input-bordered rounded-lg"
              type="text"
              disabled
              {...register("_id")}
              defaultValue={user._id}
            />
            <label className="label" htmlFor="name">
              Nombre
            </label>
            <input
              className="input input-bordered rounded-lg"
              {...register("name")}
              defaultValue={user.name}
            />
            <label htmlFor="name">Código Postal</label>
            <input
              className="input input-bordered rounded-lg"
              {...register("postal_code")}
              defaultValue={user.postal_code}
            />
            <label htmlFor="name">Número de teléfono</label>
            <input
              className="input input-bordered rounded-lg"
              {...register("phone")}
              defaultValue={user.phone}
            />
            <label className="label" htmlFor="role">
              Rol
            </label>
            <select
              className="select input-bordered rounded-lg"
              {...register("role")}
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="User">Usuario</option>
              <option value="Admin">Administrador</option>
            </select>
          </form>
          <div className="modal-action">
            <button className="btn btn-info text-white" onClick={updateUser}>
              Guardar
            </button>
            <button className="btn btn-error text-white" onClick={closeModal}>
              {data.button_decline}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ModalEdit;
