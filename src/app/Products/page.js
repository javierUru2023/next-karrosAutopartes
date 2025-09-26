"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchProductsFromFirebase } from "./firebaseUtils";
import ProductsCard from "./Components/ProductsCard";
import ProductDetail from "./Components/ProductDetail";


export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryBeforeDetail, setCategoryBeforeDetail] = useState("all");

  //-- Cargar productos solo una vez --
  useEffect(() => {
    setLoading(true);
    fetchProductsFromFirebase().then((data) => {
      setProducts(data);
  //-- Filtrar categorías válidas y evitar duplicados --
      const cats = Array.from(new Set(data.map((p) => p.category))).filter(Boolean);
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  //-- Sincronizar el filtro con el query param al cargar la página --
  useEffect(() => {
    const categoryParam = searchParams.get("category") || "all";
    setSelectedCategory(categoryParam);
  }, [searchParams]);

  //-- Spinner al cambiar de categoría --
  useEffect(() => {
    if (products.length === 0) return;
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [selectedCategory, products]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (selectedProduct) {
    const handleBack = () => {
      setSelectedProduct(null);
      setCategoryBeforeDetail(selectedCategory);
    };
    return (
      <div className="container mx-auto py-8">
        <ProductDetail
          product={selectedProduct}
          selectedCategory={categoryBeforeDetail}
          onBack={handleBack}
        />
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
    <div className="container mx-auto py-8 overflow-hidden">
      <h1 className="text-3xl font-bold mb-6 text-center">Productos</h1>
      {selectedCategory !== "all" && (
        <div className="flex justify-center mb-4">
          <button
            className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition shadow"
            onClick={() => setSelectedCategory("all")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          Todos
        </button>
        {categories.map((cat) => (
          cat && (
            <button
              key={cat}
              className={`px-4 py-2 rounded ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          )
        ))}
      </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No hay productos para esta categoría.</div>
        ) : (
          filteredProducts.map((product) => (
            <ProductsCard
              key={product.id}
              product={product}
              currentCategory={selectedCategory}
            />
          ))
        )}
      </div>
    </div>
  );
}
