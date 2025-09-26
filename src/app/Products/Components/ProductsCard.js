
import React from "react";
import Link from "next/link";

export default function ProductsCard({ product, currentCategory }) {
  const categoryParam = currentCategory && currentCategory !== "all" ? `?category=${currentCategory}` : "";
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full max-w-sm mx-auto px-2">
      <img src={product.image} alt={product.name} className="w-32 h-32 object-contain mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
      <span className="text-xs text-gray-500 mb-2">Stock: {product.stock}</span>
      <span className="text-xs text-gray-400 mb-2">Categoría: {product.category}</span>
      <Link
        href={`/Products/${product.slug}${categoryParam}`}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Detalles
      </Link>
    </div>
  );
}
