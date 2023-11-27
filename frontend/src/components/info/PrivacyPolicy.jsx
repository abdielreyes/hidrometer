const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-xl bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">
          Aviso de Privacidad - Hidrometer
        </h1>

        <p className="mb-4">Fecha de vigencia: 31 de Diciembre de 2024</p>

        <p className="mb-6">
          Bienvenido a Hidrometer, la aplicación de monitoreo del nivel de agua
          del río de los Remedios. La privacidad de nuestros usuarios es nuestra
          principal prioridad, y queremos informarte sobre cómo manejamos tus
          datos.
        </p>

        <h2 className="text-lg font-semibold mb-2">
          1. Información Recopilada:
        </h2>
        <p className="mb-4">
          Recopilamos la siguiente información para proporcionarte un servicio
          eficiente y personalizado:
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>
            Nombre: Necesario para personalizar tu experiencia y comunicarnos
            contigo de manera adecuada.
          </li>
          <li>
            Código Postal: Utilizado para ofrecerte información relevante sobre
            tu área y personalizar las alertas.
          </li>
          <li>
            Número de Teléfono: Utilizado para enviar verificaciones
            SMS/WhatsApp y notificaciones de alertas del río.
          </li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">
          2. Uso de la Información:
        </h2>
        <p className="mb-4">
          Utilizamos tus datos para los siguientes propósitos:
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>
            Monitoreo del nivel de agua: Proporcionar actualizaciones en tiempo
            real sobre el estado del agua en una sección del río de los
            Remedios.
          </li>
          <li>
            Alertas de desbordamiento: Enviarte notificaciones importantes en
            caso de desbordamiento o situaciones de riesgo en el río de los
            Remedios.
          </li>
          <li>
            Verificación SMS/WhatsApp: Enviaremos mensajes para verificar tu
            número de teléfono y garantizar la precisión de las alertas.
          </li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">
          3. Compartir Información:
        </h2>
        <p className="mb-4">
          No compartimos tus datos personales con terceros sin tu
          consentimiento, excepto cuando sea necesario para ofrecerte nuestros
          servicios.
        </p>

        {/* ... Agrega más secciones según sea necesario ... */}

        <p className="mb-4">
          Al utilizar Hidrometer, aceptas los términos de esta política de
          privacidad.
        </p>
        <p className="mb-4 underline">
          <a href="/">Volver a Inicio</a>
        </p>

        {/* Agrega el resto de la información según sea necesario */}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
