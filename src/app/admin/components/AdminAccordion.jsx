import React, { useEffect, useState, useRef } from "react";
import ContactMessagesCard from "./ContactMessagesCard";
import TableProduct from "./TableProduct";
import CreateForm from "./CreateForm";
import SalesTable from "./sales/SalesTable";

const Icon = ({ name }) => {
  switch (name) {
    case "contact":
      return <span className="mr-2">📩</span>;
    case "table":
      return <span className="mr-2">📋</span>;
    case "form":
      return <span className="mr-2">📝</span>;
    case "sales":
      return <span className="mr-2">💰</span>;
    default:
      return null;
  }
};

const AdminAccordion = () => {
  const [openSection, setOpenSection] = useState("");
  const [counts, setCounts] = useState({ contact: 0, table: 0 });
  const [allMessagesRead, setAllMessagesRead] = useState(false);
  const [contactCount, setContactCount] = useState(counts.contact);
  const [salesCount, setSalesCount] = useState(0);
  const tableRef = useRef();

  useEffect(() => {
  //-- Obtener cantidad de mensajes de contacto --
    fetch("/api/contact")
      .then(res => res.json())
      .then(data => setCounts(c => ({ ...c, contact: (data.messages || []).length })))
      .catch(() => setCounts(c => ({ ...c, contact: 0 })));
  //-- Obtener cantidad de productos --
    import("firebase/firestore").then(({ getDocs, collection }) => {
      import("@/firebase/config").then(({ db }) => {
        getDocs(collection(db, "products")).then(snapshot => {
          setCounts(c => ({ ...c, table: snapshot.docs.length }));
        }).catch(() => setCounts(c => ({ ...c, table: 0 })));
      });
    });
  //-- Obtener cantidad de ventas --
    fetch("/api/sales")
      .then(res => res.json())
      .then(data => setSalesCount((data.sales || []).length))
      .catch(() => setSalesCount(0));
  }, []);

  useEffect(() => {
    setContactCount(counts.contact);
  }, [counts.contact]);

  const updateProductCount = () => {
    import("firebase/firestore").then(({ getDocs, collection }) => {
      import("@/firebase/config").then(({ db }) => {
        getDocs(collection(db, "products")).then(snapshot => {
          setCounts(c => ({ ...c, table: snapshot.docs.length }));
        }).catch(() => setCounts(c => ({ ...c, table: 0 })));
      });
    });
  };

  const handleProductCreated = () => {
    if (tableRef.current) {
      tableRef.current.reload();
    }
    updateProductCount();
  };

  const handleProductDeleted = () => {
    updateProductCount();
  };

  const handleMessageRead = () => {
    setContactCount(c => Math.max(0, c - 1));
  };

  const sections = [
    { key: "contact", label: "Mensajes de contacto", icon: "contact", counter: contactCount, content: <ContactMessagesCard onMessageRead={handleMessageRead} /> },
    { key: "table", label: "Tabla de productos", icon: "table", counter: counts.table, content: <TableProduct ref={tableRef} onProductDeleted={handleProductDeleted} /> },
    { key: "form", label: "Formulario de productos", icon: "form", counter: null, content: <div className='bg-gray-50 rounded-lg shadow p-6 mb-8'><h3 className='text-lg font-bold mb-4 text-blue-900 text-center'>Agregar nuevo producto</h3><CreateForm onProductCreated={handleProductCreated} /></div> },
    { key: "sales", label: "Ventas realizadas", icon: "sales", counter: salesCount, content: <SalesTable /> }
  ];

  const handleToggle = (key) => {
    setOpenSection(openSection === key ? "" : key);
    if (key === "contact" && openSection !== "contact") {
      setAllMessagesRead(true);
      setCounts(c => ({ ...c, contact: 0 }));
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        {sections.map(({ key, label, icon, counter, content }) => (
          <div key={key} className="mb-4">
            <button
              className={`w-full text-left px-8 py-4 rounded font-bold border shadow flex justify-between items-center transition-all duration-300 ${openSection === key ? "bg-blue-900 text-white" : "bg-gray-200 text-blue-900"}`}
              style={{ minWidth: "300px", maxWidth: "100%" }}
              onClick={() => handleToggle(key)}
            >
              <span className="flex items-center">
                <Icon name={icon} />
                {label}
                {counter !== null && (
                  <span className={`ml-3 px-2 py-1 rounded text-xs font-bold ${openSection === key ? "bg-white text-blue-900" : "bg-blue-900 text-white"}`}>{counter}</span>
                )}
              </span>
              <span className="ml-2">{openSection === key ? "▲" : "▼"}</span>
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${openSection === key ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              {openSection === key && (
                <div className="mt-4">
                  {content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAccordion;
