export default function LoginForm() {
  return (
    <div>
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Iniciar sesión</h1>
      </div>

      <form
        action="/dashboard"
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
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
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
