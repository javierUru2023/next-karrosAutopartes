
export function generatedMetadata({ params, searchParams }, parent) {
  const data = { title: 'Acerca - Karros Autopartes',
                 description: 'Esta es la página de acerca de nosotros',
                 domain: 'www.karrosautopartes.com',
                 keywords: 'acerca, nosotros, Karros Autopartes',
                 author: 'Javier Araujo'
            };
  return data;
}

export default function About() {
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-64px-96px)] max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">Acerca de Nosotros</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 text-center">
          En Karros Autopartes somos apasionados por el mundo automotor. Desde nuestros inicios, nos hemos dedicado a ofrecer repuestos y accesorios de calidad para todo tipo de vehículos, brindando confianza y seguridad a nuestros clientes.
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400 mb-4 text-center">
          Nuestro equipo está formado por especialistas que te asesoran en cada compra, garantizando la mejor experiencia y el producto adecuado para tu necesidad. Trabajamos con marcas reconocidas y productos originales.
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400 text-center">
          ¡Gracias por elegirnos! Tu satisfacción es nuestra prioridad.
        </p>
      </div>
    </section>
  );
}
