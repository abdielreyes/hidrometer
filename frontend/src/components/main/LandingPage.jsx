function LandingPage() {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full lg:px-24 px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Hidrometer
        </h2>

        <p className=" text-gray-500 md:mt-4 md:block">
          Hidrometer te mantiene informado cuando más importa. Recibe alertas en
          tiempo real sobre desbordamientos y condiciones críticas de la sección
          del río de los Remedios de tu localidad. Tu salvavidas digital.
        </p>

        <div className="mt-4 md:mt-8">
          <a
            href="/login"
            className="inline-block rounded bg-sky-600 px-12 py-3 text-sm font-medium text-white transition hover:sky-700 focus:outline-none focus:ring focus:ring-sky-200"
          >
            ¡Iniciar sesión!
          </a>
        </div>
        <div className="mt-4 md:mt-8">
          <a
            href="/register"
            className="inline-block rounded bg-sky-600 px-12 py-3 text-sm font-medium text-white transition hover:sky-700 focus:outline-none focus:ring focus:ring-sky-200"
          >
            Registrarme
          </a>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Student"
          src="/img/sensores_en_rio.png"
          className="h-56 w-full object-cover object-center sm:h-full"
        />
      </div>
    </section>
  );
}

export default LandingPage;
