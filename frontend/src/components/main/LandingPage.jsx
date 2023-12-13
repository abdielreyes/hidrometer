function LandingPage() {
  return (
    <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 h-screen">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24 flex h-screen">
        <div className="  m-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Hidrometer
          </h2>

          <p className="hidden text-gray-500 md:mt-4 md:block">
            Hidrometer te mantiene informado cuando más importa. Recibe alertas
            en tiempo real sobre desbordamientos y condiciones críticas de la
            sección del río de los Remedios de tu localidad. Tu salvavidas
            digital.
          </p>

          <div className="mt-4 md:mt-8">
            <a
              href="/register"
              className="inline-block rounded bg-sky-600 px-12 py-3 text-sm font-medium text-white transition hover:sky-700 focus:outline-none focus:ring focus:ring-sky-200"
            >
              Registrarme!
            </a>
          </div>
        </div>
      </div>
      <div className="flex  ">
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
