import React from "react";

import Link from "next/link";
import Image from "next/image";

export default function UserCard({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start w-full max-w-sm mx-auto mb-4 border border-gray-200">
  <h2 className="text-lg font-bold mb-1 text-blue-700">{user.name}</h2>
  <p className="text-gray-600 mb-1">Usuario: <span className="font-mono">{user.username}</span></p>
      <Link href={`/posts/${user.id}`} className="mt-4 self-end" aria-label={`Ver detalle de ${user.name}`}>
        <Image src="/goIcon.svg" alt="Ir a detalle" width={32} height={32} className="hover:scale-110 transition-transform" />
      </Link>
    </div>
  );
}
