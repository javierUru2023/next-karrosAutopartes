"use client";
import React, { createContext, useReducer, useContext } from 'react';

//-- Estado inicial del carrito --
const initialState = {
	cartItems: [],
};

//-- Acciones del carrito --
const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM': {
			const itemExists = state.cartItems.find(item => item.id === action.payload.id);
			if (itemExists) {
				//-- Si el producto ya está, aumenta la cantidad --
				return {
					...state,
					cartItems: state.cartItems.map(item =>
						item.id === action.payload.id
							? { ...item, quantity: item.quantity + action.payload.quantity }
							: item
					),
				};
			}
			//-- Si no está, lo agrega --
			return {
				...state,
				cartItems: [...state.cartItems, { ...action.payload }],
			};
		}
		case 'REMOVE_ITEM': {
			return {
				...state,
				cartItems: state.cartItems.filter(item => item.id !== action.payload),
			};
		}
		case 'CLEAR_CART': {
			return {
				...state,
				cartItems: [],
			};
		}
		case 'UPDATE_QUANTITY': {
			return {
				...state,
				cartItems: state.cartItems.map(item =>
					item.id === action.payload.id
						? { ...item, quantity: action.payload.quantity }
						: item
				),
			};
		}
		default:
			return state;
	}
};

//-- Crear contexto --
const CartContext = createContext();

//-- Proveedor del contexto --
export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	//-- Funciones para manipular el carrito --
	const addItem = (item, quantity = 1) => {
		dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
	};

	const removeItem = (id) => {
		dispatch({ type: 'REMOVE_ITEM', payload: id });
	};

	const clearCart = () => {
		dispatch({ type: 'CLEAR_CART' });
	};

	const updateQuantity = (id, quantity) => {
		dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
	};

	return (
		<CartContext.Provider value={{
			cartItems: state.cartItems,
			addItem,
			removeItem,
			clearCart,
			updateQuantity,
		}}>
			{children}
		</CartContext.Provider>
	);
};

//-- Hook para usar el contexto --
export const useCart = () => useContext(CartContext);

