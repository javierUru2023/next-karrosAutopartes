"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/amortiguadores.jpg",
  "/bateria.jpg",
  "/bujias.jpeg",
  "/filtro-aceite.jpeg",
  "/lubricante.jpeg",
  "/pastillas-freno.jpg",
  "/DiscosFrenos.jpg",
  "/FaroIzq.jpg",
  "/KitDistribucion.jpg",
  "/kit-bobina-de-encendido-con-cables-1758842932235.jpg",
  "/Modin.jpg"
];

const effects = [
  "fade",
  "slide",
  "zoom"
];

function getRandomSequence(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


export default function DynamicCarousel() {
  const [current, setCurrent] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [effect, setEffect] = useState("fade");

  useEffect(() => {
    setSequence(getRandomSequence(images));
    setEffect(effects[Math.floor(Math.random() * effects.length)]);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % sequence.length;
        if ((next) % 3 === 0) {
          setEffect(effects[Math.floor(Math.random() * effects.length)]);
        }
        return next;
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [current, sequence]);

  if (sequence.length === 0) return null;

  return (
    <div className="w-full max-w-[300px] h-[300px] mx-auto flex items-center justify-center overflow-hidden relative rounded-lg shadow-lg bg-white"> 
      {sequence.map((img, idx) => (
        <Image
          key={img}
          src={img}
          alt="Producto destacado"
          width={300}
          height={300}
          className={`absolute w-full h-full object-cover transition-all duration-1000
            ${effect === "fade" ? (idx === current ? "opacity-100" : "opacity-0") : ""}
            ${effect === "slide" ? (idx === current ? "translate-x-0" : "-translate-x-full") : ""}
            ${effect === "zoom" ? (idx === current ? "scale-100" : "scale-0") : ""}
          `}
          style={{ zIndex: idx === current ? 2 : 1 }}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {sequence.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full bg-white border border-gray-400 transition-all duration-300 ${idx === current ? "bg-blue-500" : "opacity-50"}`}
          />
        ))}
      </div>
    </div>
  );
}
