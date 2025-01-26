"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import { collection, getDocs, getDoc, doc, limit, startAfter, query, orderBy, where} from "firebase/firestore";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async (paginate = false) => {
    try {
      const usersCollectionRef = collection(db, "users");
      let usersQuery = query(usersCollectionRef,
        // orderBy("LoginAt", "desc"),
        limit(5));
        
        if (paginate && lastVisibleUsers) {
          usersQuery = query(usersCollectionRef,
          // orderBy("LoginAt", "desc"),
          startAfter(lastVisibleUsers), limit(5));
        }

      const usersSnapshot = await getDocs(usersQuery);
      const newUsers = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers((prevUsers) => paginate ? [...prevUsers, ...newUsers] : newUsers)
      if (usersSnapshot.docs.length > 0) {
        setLastVisibleUsers(usersSnapshot.docs[usersSnapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching userss:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const authenticatedUser = {
          id: authUser.uid,
          name: authUser.displayName,
          email: authUser.email,
          photoURL: authUser.photoURL,
        };
        setCurrentUser(authenticatedUser);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        fetchUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};