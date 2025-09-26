"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import CreateForm from "./components/CreateForm";
import TableProduct from "./components/TableProduct";
import ContactMessagesCard from "./components/ContactMessagesCard";
import AdminAccordion from "./components/AdminAccordion";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [view, setView] = useState("");

  if (!user) return null;

  return (
    <section className="bg-white rounded-lg shadow p-8 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-900 text-center flex-1">
          Bienvenido al Panel de Administración
        </h2>
        <div className="flex items-center gap-2 ml-4">
          <span className="text-xs text-green-700 font-medium whitespace-nowrap">
            {user.email}
          </span>
          <button
            onClick={logout}
            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition font-semibold border border-gray-300"
            title="Cerrar sesión"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 mb-8">
        <AdminAccordion />
      </div>
    </section>
  );
}
