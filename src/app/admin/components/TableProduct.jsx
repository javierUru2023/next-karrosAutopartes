import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import EditProductModal from "./EditProductModal";

const TableProduct = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState("");
  const { onProductDeleted } = props;

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    } catch (error) {
      setProducts([]);
      setError("Error al cargar los productos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useImperativeHandle(ref, () => ({
    reload: fetchProducts
  }));

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas borrar este producto?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        setProducts(products.filter(product => product.id !== id));
        if (props.onProductDeleted) props.onProductDeleted();
      } catch (err) {
        setError("No se pudo eliminar el producto. Intenta nuevamente.");
      }
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleSave = async (updatedProduct) => {
    await updateDoc(doc(db, "products", updatedProduct.id), {
      name: updatedProduct.name,
      price: Number(updatedProduct.price),
      stock: Number(updatedProduct.stock),
      description: updatedProduct.description,
      image: updatedProduct.image
    });
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditProduct(null);
  };

  const handleCloseModal = () => {
    setEditProduct(null);
  };

  if (loading) return (
    <div className="flex justify-center py-8">
      <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"></span>
    </div>
  );

  return (
    <div>
      {error && <div className="text-red-600 text-center mb-4 font-bold">{error}</div>}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-2 px-4 text-left">Imagen</th>
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Stock</th>
              <th className="py-2 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">
                  <img src={product.image || product.img || "/cartImage.svg"} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="bg-yellow-400 text-white px-2 py-1 rounded text-xs font-bold hover:bg-yellow-500"
                    onClick={() => handleEdit(product)}
                    title="Editar"
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700"
                    onClick={() => handleDelete(product.id)}
                    title="Borrar"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editProduct && (
          <EditProductModal
            product={editProduct}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
});

export default TableProduct;
