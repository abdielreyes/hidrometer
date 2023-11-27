const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-xl bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">
          Términos y Condiciones - Hidrometer
        </h1>

        <p className="mb-4">Fecha de vigencia: 31 de Diciembre de 2024</p>

        <p className="mb-6">
          Bienvenido a Hidrometer, la aplicación de monitoreo del nivel de agua
          del río de los Remedios. Antes de utilizar nuestros servicios, te
          pedimos que leas detenidamente y comprendas nuestros términos y
          condiciones.
        </p>

        <h2 className="text-lg font-semibold mb-2">1. Uso de la Aplicación:</h2>
        <p className="mb-4">
          Al utilizar Hidrometer, aceptas cumplir con estos términos y
          condiciones, así como con todas las leyes y regulaciones aplicables.
        </p>

        <h2 className="text-lg font-semibold mb-2">
          2. Responsabilidad del Usuario:
        </h2>
        <p className="mb-4">
          Eres responsable de la precisión de la información que proporcionas,
          incluyendo tu nombre, código postal y número de teléfono. Además,
          comprendes y aceptas que la información del río de los Remedios es
          proporcionada con fines informativos y no nos hacemos responsables por
          daños derivados de su uso.
        </p>

        <h2 className="text-lg font-semibold mb-2">
          3. Verificación del Número de Teléfono:
        </h2>
        <p className="mb-4">
          Para garantizar la precisión de las alertas, realizaremos
          verificaciones periódicas del número de teléfono mediante
          SMS/WhatsApp. Aceptas recibir estos mensajes y responder según sea
          necesario.
        </p>

        <h2 className="text-lg font-semibold mb-2">4. Privacidad:</h2>
        <p className="mb-4">
          Tu privacidad es importante para nosotros. Consulta nuestro{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Aviso de Privacidad
          </a>
          &nbsp;para obtener información detallada sobre cómo manejamos tus
          datos.
        </p>

        {/* ... Agrega más secciones según sea necesario ... */}

        <p className="mb-4 underline">
          <a href="/">Volver a Inicio</a>
        </p>
        {/* Agrega el resto de la información según sea necesario */}
      </div>
    </div>
  );
};

export default TermsAndConditions;
