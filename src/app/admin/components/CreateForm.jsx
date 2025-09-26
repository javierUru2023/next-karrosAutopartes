"use client";
import React, { useState } from "react";
import { handleChange as handleChangeUtil } from "@/utils/handleChange";

const CATEGORIES = [
  "encendido",
  "mantenimiento",
  "frenos",
  "suspension",
  "electricidad",
  "lubricacion"
];

const CreateForm = ({ onProductCreated }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  image: null,
    category: "",
    slug: ""
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setForm(prev => ({ ...prev, name: value, slug }));
    } else if (name === "image" && files && files[0]) {
      setForm(prev => ({ ...prev, image: files[0] }));
    } else {
      handleChangeUtil(e, setForm);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.description.trim()) newErrors.description = "La descripción es obligatoria.";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) newErrors.price = "El precio debe ser mayor a 0.";
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0) newErrors.stock = "El stock debe ser 0 o mayor.";
  if (!form.image) newErrors.image = "La imagen es obligatoria.";
    if (!form.category.trim()) newErrors.category = "La categoría es obligatoria.";
    if (!form.slug.trim()) newErrors.slug = "El slug es obligatorio.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formattedCategory = form.category.charAt(0).toUpperCase() + form.category.slice(1).toLowerCase();
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.set("category", formattedCategory);
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        setStatus("Producto creado correctamente.");
  setForm({ name: "", description: "", price: "", stock: "", image: null, category: "", slug: "" });
        setErrors({});
        if (onProductCreated) onProductCreated();
      } else {
        setError("No se pudo crear el producto. Intenta nuevamente.");
      }
    } catch (err) {
      setError("No se pudo crear el producto. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h3 className="text-lg font-bold mb-4 text-blue-900">Crear Nuevo Producto</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <div className="text-red-600 text-center mb-2 font-bold">{error}</div>}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          className={`border rounded px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
          required
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          className={`border rounded px-3 py-2 ${errors.description ? 'border-red-500' : ''}`}
          required
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          className={`border rounded px-3 py-2 ${errors.price ? 'border-red-500' : ''}`}
          min="0"
          required
        />
        {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className={`border rounded px-3 py-2 ${errors.stock ? 'border-red-500' : ''}`}
          min="0"
          required
        />
        {errors.stock && <span className="text-red-500 text-sm">{errors.stock}</span>}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className={`border rounded px-3 py-2 ${errors.image ? 'border-red-500' : ''}`}
          required
        />
        {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className={`border rounded px-3 py-2 ${errors.category ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Selecciona una categoría</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
        {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
        <input
          type="text"
          name="slug"
          value={form.slug}
          readOnly
          placeholder="Slug generado automáticamente"
          className={`border rounded px-3 py-2 bg-gray-100 text-gray-500 ${errors.slug ? 'border-red-500' : ''}`}
        />
        {errors.slug && <span className="text-red-500 text-sm">{errors.slug}</span>}
        <button
          type="submit"
          className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800 transition font-bold"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Producto"}
        </button>
        {status && <div className={`mt-2 text-sm ${status.includes("correctamente") ? "text-green-600" : "text-red-600"}`}>{status}</div>}
      </form>
    </div>
  );
}

export default CreateForm;
