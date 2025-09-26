"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Counter from "@/components/Counter";
import { useCart } from "@/context/CartContext";
export default function ProductDetail({ product, onBack, selectedCategory }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  if (!product) return <div className="text-red-600 text-center font-bold">Producto no encontrado.</div>;

  const handleAddToCart = () => {
    if (disabled) return;
    addItem(product, quantity);
    setSuccess(true);
    setDisabled(true);
    setQuantity(1);
    setTimeout(() => {
      setSuccess(false);
      setDisabled(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 flex flex-col items-center w-full max-w-sm mx-auto sm:max-w-md px-2 relative">
      <button
        className="absolute left-4 top-4 flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition shadow"
        onClick={() => {
          if (selectedCategory && selectedCategory !== "all") {
            router.push(`/Products?category=${selectedCategory}`);
          } else {
            router.push("/Products");
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Volver
      </button>
  <Image src={product.image} alt={product.name} width={192} height={192} className="w-32 h-32 sm:w-48 sm:h-48 object-contain mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-center">{product.name}</h2>
      <p className="text-gray-600 mb-2 text-center">{product.description}</p>
      <span className="text-blue-700 font-bold mb-2 text-lg">${product.price}</span>
      <span className="text-xs text-gray-500 mb-2">Stock: {product.stock}</span>
      <span className="text-xs text-gray-400 mb-4">Categoría: {product.category}</span>
      <div className="mb-4">
        <Counter value={quantity} setValue={setQuantity} min={1} max={product.stock} />
      </div>
      <button
        className={`mb-2 px-4 py-2 rounded transition ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        onClick={handleAddToCart}
        disabled={disabled}
      >
        {success ? '¡Agregado!' : 'Agregar al carrito'}
      </button>
    </div>
  );
}
