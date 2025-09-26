"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";


const LoginForm = () => {
  const { login, register, loginWithGoogle, logout, loading, user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await register(form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
    } catch (err) {
      setError(isRegister ? "Error al registrar usuario." : "Credenciales incorrectas o error de autenticación.");
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
    } catch (err) {
      setError("Error al iniciar sesión con Google.");
    }
  };

  if (user) {
    return (
      <div className="text-green-600 font-bold flex flex-col items-center gap-4">
        ¡Bienvenido, {user.email}!
        <button
          onClick={logout}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition font-bold"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow p-8 mt-8">
      {error && <div className="text-red-600 text-center mb-2 font-bold">{error}</div>}
      <h2 className="text-xl font-bold mb-4 text-blue-900">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800 transition font-bold"
          disabled={loading}
        >
          {loading ? (isRegister ? "Registrando..." : "Ingresando...") : (isRegister ? "Registrarse" : "Ingresar")}
        </button>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="bg-gray-200 text-blue-900 py-2 px-4 rounded hover:bg-gray-300 transition font-bold"
        >
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>
        <button
          type="button"
          onClick={handleGoogle}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition font-bold"
          disabled={loading}
        >
          {loading ? "Procesando..." : "Ingresar con Google"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
