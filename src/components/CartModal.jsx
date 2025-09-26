import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, addItem, removeItem, updateQuantity, clearCart } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!name || !address || !city || !email) return;
  //-- Guarda la venta en Firestore --
    try {
      const sale = {
        customerName: name,
        customerEmail: email,
        customerAddress: address,
        customerCity: city,
        products: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        date: new Date().toISOString()
      };
      await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sale)
      });
    } catch (err) {
      console.error("Error al guardar la venta:", err);
      return;
    }
    clearCart();
    setName("");
    setAddress("");
    setCity("");
    setEmail("");
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };
  return (
    <div>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ willChange: 'opacity' }}
      >
        <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-lg p-6 border border-gray-200 relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Carrito de compras</h2>
          <div className="flex-1 overflow-y-auto">
            {showSuccess ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-fade-in-up bg-gradient-to-br from-green-400/90 to-green-600/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-4 border-green-500 flex flex-col items-center transition-all duration-700 opacity-100">
                  <svg className="w-16 h-16 text-white mb-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" stroke="white" />
                  </svg>
                  <h3 className="text-2xl font-extrabold text-white mb-2 drop-shadow">¡Compra realizada con éxito!</h3>
                  <p className="text-center text-white/90">Vas a recibir una notificación a <span className="font-semibold underline">{email}</span> con el detalle de tu pedido.</p>
                </div>
                <style jsx>{`
                  .animate-fade-in-up {
                    animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both;
                  }
                  @keyframes fadeInUp {
                    0% {
                      opacity: 0;
                      transform: translateY(40px);
                    }
                    100% {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">El carrito está vacío.</div>
            ) : (
              <div>
                <form className="mb-6 flex flex-col gap-4" onSubmit={handleCheckout}>
                  <input type="text" placeholder="Nombre" className="border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
                  <input type="email" placeholder="Correo electrónico" className="border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
                  <input type="text" placeholder="Dirección" className="border rounded px-3 py-2" value={address} onChange={e => setAddress(e.target.value)} required />
                  <input type="text" placeholder="Ciudad" className="border rounded px-3 py-2" value={city} onChange={e => setCity(e.target.value)} required />
                </form>
                <div className="flex flex-col gap-4 mb-4">
                  {cartItems.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between border border-gray-200">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <span className="font-semibold text-base">{product.name}</span>
                          <span className="block text-xs text-gray-400">${product.price} x {product.quantity}</span>
                          <span className="block text-xs text-blue-600 font-bold">Subtotal: {(product.price * product.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => handleDecrease(product)}
                        >-</button>
                        <span className="font-bold text-lg">{product.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => handleIncrease(product)}
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-xl font-bold text-green-600">
                    ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
                  disabled={!name || !address || !city || !email}
                  onClick={handleCheckout}
                >
                  Finalizar compra
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
