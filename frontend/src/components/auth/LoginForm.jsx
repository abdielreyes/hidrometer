import { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../utils/variables";
import axios from "axios";
import { FaPhone, FaPhoneVolume } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const [verified, setVerified] = useState(false);
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (formData) => {
    console.log(BASE_URL);
    if (!verified) {
      if (await checkPhone(formData.phone)) {
        console.log("Phone exists");
        setVerified(true);
        sendVerificationCode(formData.phone);
      }
    } else {
      sendLogin(formData);
    }
    console.log(formData);
  };
  const checkPhone = async (phone) => {
    try {
      axios.post(BASE_URL + "/api/auth/checkPhone", {
        phone: phone,
      });
      return true;
    } catch (error) {
      console.error(error.response.data.message);
      return false;
    }
  };
  const sendVerificationCode = async (phone) => {
    try {
      const response = await axios.post(
        BASE_URL + "/api/auth/login/sendVerify",
        {
          phone: phone,
          channel: "sms",
        }
      );
      const data = response.data;
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  const sendLogin = async (formData) => {
    try {
      const response = await axios.post(BASE_URL + "/api/auth/login/verify", {
        phone: formData.phone,
        code: formData.code,
      });

      const data = response.data;

      if (response.status !== 200) {
        toast.error(data.message);
        return;
      } else {
        console.log(data);
        toast.success(data.message);
        window.localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };
  const resendVerificationCode = () => {
    sendVerificationCode(getValues().phone);
  };
  return (
    <div>
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Iniciar sesión</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="phone" className="sr-only">
            Número de Teléfono
          </label>

          <div className="relative">
            <input
              {...register("phone", { required: true, type: "tel" })}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Número de teléfono"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <FaPhone />
            </span>
          </div>
        </div>
        {verified ? (
          <div>
            <label htmlFor="code" className="sr-only">
              Verifica Número de Teléfono
            </label>

            <div className="relative">
              <input
                {...register("code", {
                  required: true,
                  type: "number",
                })}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Código de verificación"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <FaPhoneVolume />
              </span>
            </div>
            <p className="text-sm px-1 py-1 text-gray-500">
              ¿No llegó tu código de verificación? &nbsp;
              <a onClick={resendVerificationCode} className="underline">
                Reenviar código
              </a>
            </p>
          </div>
        ) : (
          <div></div>
        )}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            ¿No tienes una cuenta? &nbsp;
            <a className="underline" href="/register">
              Regístrate
            </a>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}
