import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div className="grid h-screen px-4 bg-white place-content-center">
        <h1 className="tracking-widest text-gray-500 uppercase">
          404 | No Encontrado
        </h1>
      </div>
    </div>
  );
}
