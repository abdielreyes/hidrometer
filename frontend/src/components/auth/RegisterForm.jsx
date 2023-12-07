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
  const { register, handleSubmit } = useForm();
  const onSubmit = async (formData) => {
    console.log(BASE_URL);
    if (!verified) {
      if (await checkPhone(formData.phone)) {
        setVerified(true);
        sendVerificationCode(formData.phone);
      }
    } else {
      sendRegistration(formData);
    }
    console.log(formData);
  };
  const checkPhone = async (phone) => {
    try {
      const response = await axios.post(
        BASE_URL + "/api/auth/checkPhone",
        {
          phone: phone,
        },
        {
          validateStatus: false,
        }
      );
      const data = response.data;
      if (response.status == 200) {
        toast.error(data.message);
        return false;
      } else {
        console.log(data);
        return true;
      }
    } catch (error) {
      console.error("Error", error);
      return false;
    }
  };

  const sendVerificationCode = async (phone) => {
    try {
      console.log("Sending verification code to " + phone);

      const response = await axios.post(
        BASE_URL + "/api/auth/registration/sendVerify",
        {
          method: "POST",
          body: JSON.stringify({ phone: phone, channel: "sms" }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      if (response.status !== 200) {
        toast.error(data.message);
        return;
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const sendRegistration = async (formData) => {
    try {
      const response = await axios.post(
        BASE_URL + "/api/auth/registration/verify",
        formData,
        {
          validateStatus: false,
        }
      );

      const data = await response.data;
      console.log(response);
      if (response.status !== 200) {
        toast.error(data.message);
        return;
      } else {
        console.log(data, response.status);
        toast.success(data.message);
        window.localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
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
              {...register("postalCode", { required: true, type: "number" })}
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
