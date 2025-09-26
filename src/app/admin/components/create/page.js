"use client";
import React from "react";
import CreateForm from "../CreateForm";

export default function CreateProductPage() {
  // Aquí podrías agregar lógica para manejar la creación del producto
  const handleCreate = (productData) => {
    // Por ejemplo, enviar a Firebase o mostrar un mensaje
    console.log("Producto creado:", productData);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <CreateForm onCreate={handleCreate} />
    </div>
  );
}
