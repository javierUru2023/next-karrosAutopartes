
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-full max-w-xs">
        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
          <svg className="w-12 h-12 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Cargando...">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <span className="mt-4 text-blue-700 font-semibold text-lg">Cargando producto...</span>
        </div>
      </div>
    </div>
  );
}
