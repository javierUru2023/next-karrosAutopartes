"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase/config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const auth = getAuth(app);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, [auth]);



			const login = async (email, password) => {
				setLoading(true);
				try {
					await signInWithEmailAndPassword(auth, email, password);
				} finally {
					setLoading(false);
				}
			};

			const register = async (email, password) => {
				setLoading(true);
				try {
					await createUserWithEmailAndPassword(auth, email, password);
				} finally {
					setLoading(false);
				}
			};

		const loginWithGoogle = async () => {
			setLoading(true);
			try {
				const provider = new GoogleAuthProvider();
				await signInWithPopup(auth, provider);
			} finally {
				setLoading(false);
			}
		};

	const logout = async () => {
		setLoading(true);
		try {
			await signOut(auth);
		} finally {
			setLoading(false);
		}
	};

			return (
				<AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>
					{children}
				</AuthContext.Provider>
			);
}

export function useAuth() {
	return useContext(AuthContext);
}
