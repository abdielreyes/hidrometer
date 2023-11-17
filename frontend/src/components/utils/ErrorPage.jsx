import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div class="grid h-screen px-4 bg-white place-content-center">
        <h1 class="tracking-widest text-gray-500 uppercase">
          404 | No Encontrado
        </h1>
      </div>
    </div>
  );
}
