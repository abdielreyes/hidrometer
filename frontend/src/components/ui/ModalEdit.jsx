import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/variables";
import { useForm } from "react-hook-form";
function ModalEdit({ confirm, data }) {
  const closeModal = () => {
    document.getElementById("modal_edit").close();
  };
  const [user, setUser] = useState({
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
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [data.user_id]);
  const onSubmit = async (data, e) => {
    e.preventDefault();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input {...register("name")} />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("exampleRequired", { required: true })} />

            <input type="submit" value="aasdasdasdasd" />
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-success text-white" onClick={confirm}>
                {data.button_accept}
              </button>
            </form>
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
