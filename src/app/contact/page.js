"use client";

import React, { useState } from "react";
import { handleChange as handleChangeUtil } from "@/utils/handleChange";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => handleChangeUtil(e, setForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.received) {
        setStatus("Mensaje enviado correctamente");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError("Error al enviar el mensaje. Intenta nuevamente.");
      }
    } catch {
      setError("Error al enviar el mensaje. Intenta nuevamente.");
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
        {error && <div className="text-red-600 text-center mb-2 font-bold">{error}</div>}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">Contacto</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
            <input type="text" id="name" name="name" required value={form.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Correo electrónico</label>
            <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700" />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Mensaje</label>
            <textarea id="message" name="message" rows={4} required value={form.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"></textarea>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">Enviar</button>
        </form>
        {status && <div className="mt-4 text-center text-sm text-green-600 dark:text-green-400">{status}</div>}
      </div>
    </section>
  );
}
