"use client";

import React, { useState } from "react";
import Image from "next/image";
import CartSidebar from "../CartModal.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { navbarLinks } from "./navbarlink";
import Link from "next/link";

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
        const { cartItems } = useCart();
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="w-full flex flex-wrap items-center justify-center md:justify-between px-4 py-2">
                    <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
                        <Image
                            src="/logoKarrosAutopartes.svg"
                            alt="logo Karros Autopartes"
                            width={180}
                            height={90}
                            className="w-28 h-16 sm:w-[120px] sm:h-[60px]"
                        />
                        <span className="self-center text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold whitespace-nowrap dark:text-white">
                            Karros Autopartes
                        </span>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-2"
                        aria-controls="navbar-default"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {navbarLinks.map((item) => (
                                <li key={item.label} className="w-full md:w-auto">
                                    <Link href={item.href} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent w-full text-center md:w-auto md:text-left">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li className="flex items-center">
                                <button
                                    type="button"
                                    className="px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent flex items-center"
                                    onClick={() => setCartOpen(true)}
                                    aria-label="Abrir carrito"
                                >
                                    <div className="relative">
                                        <Image
                                            src="/cartImage.svg"
                                            alt="Logo Carrito"
                                            width={48}
                                            height={48}
                                            className="h-12 w-12 object-contain"
                                        />
                                        {totalQuantity > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-0.5 shadow-md">
                                                {totalQuantity}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
