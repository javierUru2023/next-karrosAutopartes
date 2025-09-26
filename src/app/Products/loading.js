export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full max-w-sm mx-auto px-2 animate-pulse">
            <div className="w-32 h-32 mb-4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="w-3/4 h-6 mb-2 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="w-1/2 h-5 mb-2 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="w-full h-4 mb-2 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="w-1/3 h-4 mb-2 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="w-1/4 h-4 mb-2 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="w-1/2 h-8 mt-4 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
