"use client";
import React, { useEffect, useState } from "react";
import ProductsCard from "../Components/ProductsCard";
import ProductDetail from "../Components/ProductDetail";
import { fetchProductsFromFirebase } from "./firebaseUtils";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchProductsFromFirebase();
        setProducts(data);
        const cats = Array.from(
          new Set(
            data
              .map((p) => p.category && p.category.trim().toLowerCase())
          )
        ).filter(Boolean);
        setCategories(cats);
      } catch (err) {
        setError("Error al cargar los productos. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (selectedProduct) {
    return (
      <div className="container mx-auto py-8">
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-full max-w-xs">
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
            <svg className="w-12 h-12 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Cargando...">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span className="mt-4 text-blue-700 font-semibold text-lg">Cargando productos...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {error && <div className="text-red-600 text-center mb-4 font-bold">{error}</div>}
      <h1 className="text-3xl font-bold mb-6 text-center">Productos</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedCategory("all")}
        >
          Todos
        </button>
        {categories.map((cat) => (
          cat && (
            <button
              key={cat}
              className={`px-4 py-2 rounded ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          )
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductsCard key={product.id} product={product} onShowDetails={() => setSelectedProduct(product)} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
