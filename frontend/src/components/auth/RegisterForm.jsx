import {
  FaPhone,
  FaRegUser,
  FaLocationDot,
  FaPhoneVolume,
} from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../utils/variables";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();
  const onSubmit = async (formData) => {
    if (!verified) {
      const phone = formData.phone;
      const phoneRegistered = await checkPhone(phone);
      console.log(phoneRegistered);
      if (!phoneRegistered) {
        sendVerificationCode(phone);
        setVerified(true);
      } else {
        toast.error("El número de teléfono ya está registrado");
      }
    } else {
      sendRegistration(formData);
    }
    console.log(formData);
  };
  const checkPhone = async (phone) => {
    phone = "+52" + phone;
    try {
      const response = await axios.post(
        BASE_URL + "/api/auth/phoneIsRegistered",
        {
          phone: phone,
        }
      );
      console.log(response);
      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    }
  };

  const sendVerificationCode = async (phone) => {
    try {
      phone = "+52" + phone;
      console.log("Sending verification code to " + phone);

      const response = await axios.post(
        BASE_URL + "/api/auth/registration/sendVerify",
        {
          phone: phone,
          channel: "sms",
        }
      );

      const data = response.data;
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };
  const sendRegistration = async (formData) => {
    formData.phone = "+52" + formData.phone;
    try {
      const response = await axios.post(
        BASE_URL + "/api/auth/registration/verify",
        formData
      );

      const data = await response.data;
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      navigate("/");
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
        <h1 className="text-2xl font-bold sm:text-3xl">Registrarme</h1>

        <p className="mt-4 text-gray-500">
          Protege a tu comunidad con Hidrometer. Recibe notificaciones cruciales
          sobre el estado del agua de la seccion del río de los Remedios de tu
          localidad. La información que salva vidas, al alcance de tu mano.
        </p>
      </div>

      <form
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="name" className="sr-only">
            Nombre
          </label>

          <div className="relative">
            <input
              {...register("name", { required: true, type: "text" })}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Nombre"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <FaRegUser />
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Código Postal
          </label>

          <div className="relative">
            <input
              {...register("postal_code", { required: true, type: "number" })}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Código postal"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <FaLocationDot />
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            Número de Teléfono
          </label>

          <div className="relative">
            <input
              {...register("phone", {
                required: true,
                type: "number",
                maxLength: 10,
                minLength: 10,
              })}
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
            <label htmlFor="verificationCode" className="sr-only">
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
              <p className="text-sm px-1 py-1 text-gray-500">
                ¿No llegó tu código de verificación? &nbsp;
                <a onClick={resendVerificationCode} className="underline">
                  Reenviar código
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <p className="text-xs text-gray-500">
            Al registrarme acepto el&nbsp;
            <a className="underline" href="/privacy">
              aviso de privacidad
            </a>
            &nbsp;y los&nbsp;
            <a className="underline" href="/terms">
              términos y condiciones.
            </a>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            ¿Ya tienes una cuenta? &nbsp;
            <a className="underline" href="/login">
              Inicia Sesión
            </a>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Registrarme
          </button>
        </div>
      </form>
    </div>
  );
}
