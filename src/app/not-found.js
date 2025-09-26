import Link from "next/link";
export default function NotFound() {
  return (
  <div className="flex items-center justify-center bg-white dark:bg-gray-900 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700 w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2">
        <img
          src="/notFoundPage.jpg"
          alt="Página no encontrada"
          className="w-full h-40 sm:h-48 md:h-64 object-cover mb-6 rounded-lg shadow"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">Página no encontrada</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">La página que buscas no existe o fue movida.</p>
        <Link href="/" className="inline-block px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition-colors text-center">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

