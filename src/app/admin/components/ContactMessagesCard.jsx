import React, { useEffect, useState } from "react";

const ContactMessagesCard = ({ onMessageRead }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openedIdx, setOpenedIdx] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/contact");
        if (!res.ok) throw new Error("No se pudo cargar los mensajes");
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        setMessages([]);
        setError("Error al cargar los mensajes. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleOpenMessage = (idx) => {
    setOpenedIdx(idx);
    if (onMessageRead) onMessageRead();
  };

  const handleDelete = async (idx) => {
    if (window.confirm("¿Seguro que deseas borrar este mensaje?")) {
      const id = messages[idx].id;
      try {
        const res = await fetch("/api/contact", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) throw new Error("No se pudo eliminar el mensaje");
        // Recargar mensajes
        setOpenedIdx(null);
        setLoading(true);
        const res2 = await fetch("/api/contact");
        const data = await res2.json();
        setMessages(data.messages || []);
        setLoading(false);
      } catch (err) {
        setError("No se pudo eliminar el mensaje. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow p-6 mb-8">
      {error && (
        <div className="text-red-600 text-center mb-4 font-bold">{error}</div>
      )}
      {loading ? (
        <div className="flex justify-center py-4">
          <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"></span>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-500">No hay mensajes recibidos.</div>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg, idx) => (
            <li key={idx}>
              <button
                className={`w-full text-left px-4 py-3 rounded font-bold border shadow flex justify-between items-center ${
                  openedIdx === idx
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200 text-blue-900"
                }`}
                onClick={() => handleOpenMessage(idx)}
              >
                Mensaje {idx + 1}
              </button>
              {openedIdx === idx && (
                <div className="bg-white rounded shadow p-4 border mt-2">
                  <div className="font-bold text-blue-900">{msg.name}</div>
                  <div className="text-sm text-gray-700">{msg.email}</div>
                  <div className="mt-2 text-gray-800">{msg.message}</div>
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(msg.date).toLocaleString()}
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700"
                      onClick={() => handleDelete(idx)}
                      title="Eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactMessagesCard;
