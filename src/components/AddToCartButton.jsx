import React, { useState, useContext, useEffect, useRef } from 'react';
import { CartContext } from '../../context/CartContext.jsx';

export default function AddToCartButton({ product, quantity }) {
  const { addToCart } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const prevQuantity = useRef(quantity);

  useEffect(() => {
    if (quantity !== prevQuantity.current) {
      setDisabled(false);
      prevQuantity.current = quantity;
    }
  }, [quantity]);

  const handleAddToCart = () => {
    try {
      if (!product) throw new Error('Producto no disponible');
      if (!quantity || quantity < 1) throw new Error('Cantidad inválida');
      addToCart(product, quantity);
      setSuccess(true);
      setError(null);
      setDisabled(true);
      setTimeout(() => setSuccess(false), 1500);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleAddToCart}
        className={`bg-blue-600 text-white px-4 py-2 rounded transition ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        disabled={disabled}
      >
        {success ? '¡Agregado!' : 'Agregar al carrito'}
      </button>
      {error && <span className="text-red-500 text-xs">{error}</span>}
      {success && <span className="text-green-500 text-xs">¡Agregado!</span>}
    </div>
  );
}
