"use client"
import React, { use } from 'react'


const Counter = ({ value, setValue, min = 1, max = 99 }) => {
  const increment = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={decrement} className="px-2 py-1 bg-gray-200 rounded">-</button>
      <span className="px-4 py-1 border rounded bg-white">{value}</span>
      <button onClick={increment} className="px-2 py-1 bg-gray-200 rounded">+</button>
    </div>
  );
};

export default Counter;
