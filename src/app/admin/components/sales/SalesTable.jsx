import React, { useEffect, useState } from "react";

export default function SalesTable() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await fetch("/api/sales");
        if (!res.ok) throw new Error("No se pudieron obtener las ventas");
        const data = await res.json();
        setSales(data.sales || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSales();
  }, []);

  if (loading) return <div className="text-center py-8">Cargando ventas...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h3 className="text-lg font-bold mb-4 text-blue-900">Ventas realizadas</h3>
      {sales.length === 0 ? (
        <div className="text-gray-500 text-center">No hay ventas registradas.</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">ID</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Email</th>
              <th className="p-2">Productos</th>
              <th className="p-2">Total</th>
              <th className="p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id} className="border-t">
                <td className="p-2">{sale.id}</td>
                <td className="p-2">{sale.customerName}</td>
                <td className="p-2">{sale.customerEmail}</td>
                <td className="p-2">
                  {sale.products.map(p => `${p.name} (x${p.quantity})`).join(", ")}
                </td>
                <td className="p-2">${sale.total}</td>
                <td className="p-2">{new Date(sale.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
