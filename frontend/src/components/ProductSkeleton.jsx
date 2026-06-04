export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-2 animate-pulse">

      {/* IMAGE */}
      <div className="w-full h-40 bg-gray-300 rounded"></div>

      {/* TEXT */}
      <div className="p-2 space-y-2">

        <div className="h-3 bg-gray-300 rounded w-3/4"></div>

        <div className="h-3 bg-gray-300 rounded w-1/2"></div>

        <div className="h-3 bg-gray-300 rounded w-full"></div>

      </div>

    </div>
  );
}