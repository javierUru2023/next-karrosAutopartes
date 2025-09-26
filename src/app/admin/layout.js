"use client";
import React from "react";

export default function AdminLayout({ children, auth }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white py-4 px-8 flex items-center justify-between shadow">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <span className="text-sm">Admin</span>
      </header>
      <main className="p-8 max-w-5xl mx-auto relative">
        {children}
        {auth}
      </main>
    </div>
  );
}
