import React from "react";
import Link from "next/link";
import Image from "next/image";

export default async function PostDetailPage(props) {
  const { id } = await props.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) return <div>No se encontró el usuario</div>;
  const user = await res.json();

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-8 flex flex-col items-start">
      <h2 className="text-2xl font-bold mb-2 text-blue-700">{user.name}</h2>
      <p className="text-gray-700 mb-1">Email: <span className="font-medium">{user.email}</span></p>
      <p className="text-gray-600 mb-1">Usuario: <span className="font-mono">{user.username}</span></p>
      <p className="text-gray-500 mb-1">Tel: {user.phone}</p>
      <p className="text-gray-400 text-sm">Sitio: <a href={`http://${user.website}`} className="underline text-blue-500" target="_blank" rel="noopener noreferrer">{user.website}</a></p>
      <p className="text-xs text-gray-400 mt-2">Empresa: {user.company?.name}</p>
      <p className="text-xs text-gray-400">Ciudad: {user.address?.city}</p>
      <Link href="/posts" className="mt-4 self-end" aria-label="Volver a la lista de usuarios">
        <Image src="/returnIcon.svg" alt="Volver" width={32} height={32} className="hover:scale-110 transition-transform" />
      </Link>
    </div>
  );
}
