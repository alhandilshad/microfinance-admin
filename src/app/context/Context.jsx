"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import { collection, getDocs, getDoc, doc, limit, startAfter, query, orderBy, where} from "firebase/firestore";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [ratesUpdateTime, setRatesUpdateTime] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [extras, setExtras] = useState([]);
  const [inqueries, setInqueries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [rates, setRates] = useState([]);
  const [lastVisibleProducts, setLastVisibleProducts] = useState(null);
  const [lastVisibleUsers, setLastVisibleUsers] = useState(null);

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

  const fetchProducts = async (paginate = false) => {
    try {
      const productCollectionRef = collection(db, "products");
      let productQuery = query(
        productCollectionRef,
        orderBy("createdAt", "desc"),
        limit(5)
      );

      if (paginate && lastVisibleProducts) {
        productQuery = query(
          productCollectionRef,
          orderBy("createdAt", "desc"),
          startAfter(lastVisibleProducts),
          limit(5)
        );
      }

      const productSnapshot = await getDocs(productQuery);
      const newProducts = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts((prevProducts) => paginate ? [...prevProducts, ...newProducts] : newProducts)
      if (productSnapshot.docs.length > 0) {
        setLastVisibleProducts(productSnapshot.docs[productSnapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const orderCollectionRef = collection(db, "orders");
      const orderSnapshot = await getDocs(orderCollectionRef);
      const orders = orderSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orders);
      localStorage.setItem("orders", JSON.stringify(orders));
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesCollectionRef = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesCollectionRef);
      const categories = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categories);
      localStorage.setItem("categories", JSON.stringify(categories));
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  const fetchCoupon = async () => {
    try {
      const couponsCollectionRef = collection(db, "coupons");
      const couponsSnapshot = await getDocs(couponsCollectionRef);
      const coupons = couponsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCoupons(coupons);
      localStorage.setItem("coupons", JSON.stringify(coupons));
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  const fetchExtras = async () => {
    try {
      const extrasCollectionRef = collection(db, "CheckOutOptions");
      const extrasSnapshot = await getDocs(extrasCollectionRef);
      const extras = extrasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExtras(extras);
      localStorage.setItem("extras", JSON.stringify(extras));
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  const fetchInqueries = async () => {
    try {
      const contactCollectionRef = collection(db, "contactInqueries");
      const contactSnapshot = await getDocs(contactCollectionRef);
      const contacts = contactSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInqueries(contacts);
      localStorage.setItem("extras", JSON.stringify(contacts));
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  const fetchNewsletter = async () => {
    try {
      const newsletterCollectionRef = collection(db, "Newsletter");
      const newsletterSnapshot = await getDocs(newsletterCollectionRef);
      const newsletter = newsletterSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubscribers(newsletter);
      localStorage.setItem("extras", JSON.stringify(newsletter));
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  const ratesCollectionRef = doc(db, "exchangeRates", "latestRates");
  const fetchRates = async () => {
    const ratesSnapshot = await getDoc(ratesCollectionRef);
    if (ratesSnapshot.exists()) {
      const data = ratesSnapshot.data();
      setRates(data.rates);
      setRatesUpdateTime(data.lastUpdated);
    } else {
      console.log("No rates found in Firestore");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchUsers(), fetchOrders(), fetchProducts(), fetchCategories(), fetchCoupon(), fetchExtras(), fetchRates(), fetchInqueries(), fetchNewsletter()]);
    };
    fetchData();
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
        orders,
        products,
        categories,
        coupons,
        extras,
        inqueries,
        setInqueries,
        subscribers,
        setSubscribers,
        rates,
        setRates,
        setProducts,
        ratesUpdateTime,
        fetchProducts,
        fetchUsers,
        fetchOrders,
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