import React, { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

const useAuthContext = () => {
	return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
	}, []);

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const login = async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		signOut(auth);
	};

	const contextValues = {
		// here be everything the children needs/should be able to use
		signup,
		login,
		user,
		logout,
		setUser,
	};

	return (
		<AuthContext.Provider value={contextValues}>
			{children}
		</AuthContext.Provider>
	);
};

export { useAuthContext, AuthContextProvider as default };
