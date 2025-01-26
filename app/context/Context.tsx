"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { db } from "@/utils/firebaseConfig";
import { collection, doc, getDocs, query, where, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export interface Product {
  imageUrl: string;
  imageUrls: string[];
  name: string;
  image: string;
  quantity: number;
  disc: ReactNode;
  id: string;
  title: string;
  price: number;
  // imageUrl: string | null;
  description: string;
  gender: string;
  caseMaterial: string;
  shape: string;
  item: { details: string };
  createdAt:  {seconds: number; nanoseconds: number};
  selectedOptions?: string[];
  hidePrice?: boolean;
}
export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
}
export interface Coupon {
  id: string;
  couponCode: string;
  createdAt: {seconds: number; nanoseconds: number};
  discount: number;
  expiryDate: string;
}

export interface Options {
  id: string;
  title: string;
  price: number;
}

interface ContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  cartLength: number;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  wishlistLength: number;
  watches: Product[];
  jewellery: Product[];
  coupons: Coupon[];
  options: Options[];
  user: User | null;
  setUser: (user: User | null) => void;
  currency: string;
  switchCurrency: (newCurrency: string) => void;
  exchangeRates: { [key: string]: number } | null;
}

const Context = createContext<ContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [watches, setWatches] = useState<Product[]>([]);
  const [jewellery, setJewellery] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [options, setOptions] = useState<Options[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currency, setCurrency] = useState<string>("AED");
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number } | null>(null);
  const wishlistLength = wishlist.length;
  const cartLength = cart.length;

  const fetchExchangeRates = async () => {
    const savedRates = localStorage.getItem("exchangeRates");
    const savedLastUpdated = localStorage.getItem("lastUpdated");

    const currentTime = Date.now();
    const oneDayInMillis = 24 * 60 * 60 * 1000;

    if (savedRates && savedLastUpdated) {
      const lastUpdatedTime = new Date(savedLastUpdated).getTime();
      const timeDifference = currentTime - lastUpdatedTime;

      if (timeDifference < oneDayInMillis) {
        setExchangeRates(JSON.parse(savedRates));
        console.log("Using cached exchange rates from localStorage");
        return;
      }
    }

    await updateExchangeRatesFromFirestore();
  };

  const updateExchangeRatesFromFirestore = async () => {
    const ratesDocRef = doc(db, "exchangeRates", "latestRates");
    const ratesDoc = await getDoc(ratesDocRef);

    if (ratesDoc.exists()) {
      const data = ratesDoc.data();
      const lastUpdated = data?.lastUpdated;
      const rates = data?.rates.rates;
      const lastUpdatedTime = new Date(lastUpdated).toISOString();

      if (rates && lastUpdatedTime) {
        setExchangeRates(rates);
        localStorage.setItem("exchangeRates", JSON.stringify(rates));
        localStorage.setItem("lastUpdated", lastUpdatedTime);
      }
    } else {
      console.error("Exchange rates document not found in Firestore");
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const watchesCollection = collection(db, "products");
        const watchesQuery = query(watchesCollection, where("productType", "==", "watch"));
        const watchesSnapshot = await getDocs(watchesQuery);
        const watchesList = watchesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setWatches(watchesList);
        localStorage.setItem("watches", JSON.stringify(watchesList));
      } catch (error) {
        console.error("Error fetching watches:", error);
      }

      try {
        const jewelleryCollection = collection(db, "products");
        const jewelleryQuery = query(jewelleryCollection, where("productType", "==", "jewellery"));
        const jewellerySnapshot = await getDocs(jewelleryQuery);
        const jewelleryList = jewellerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setJewellery(jewelleryList);
        localStorage.setItem("jewellery", JSON.stringify(jewelleryList));
      } catch (error) {
        console.error("Error fetching watches:", error);
      }
    };

    const fetchCoupon = async () => {
      try {
        const couponsCollection = collection(db, "coupons");
        const couponsSnapshot = await getDocs(couponsCollection);
        const couponsList = couponsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Coupon[];
        setCoupons(couponsList);
        localStorage.setItem("coupons", JSON.stringify(couponsList));
      } catch (error) {
        console.error("Error fetching watches:", error);
      }
    };

    const fetchCheckOutOptions = async () => {
      try {
        const optionsCollection = collection(db, "CheckOutOptions");
        const optionsSnapshot = await getDocs(optionsCollection);
        const optionsList = optionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Options[];
        setOptions(optionsList);
        localStorage.setItem("options", JSON.stringify(optionsList));
      } catch (error) {
        console.error("Error fetching watches:", error);
      }
    };

    fetchData();
    fetchCoupon();
    fetchCheckOutOptions();

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);

    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const addToWishlist = (product: Product) => {
    if (wishlist.some((item) => item.id === product.id)) return;
    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
  console.log("setWishlist", wishlist);

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const addToCart = (product: Product) => {
    if (cart.some((item) => item.id === product.id)) return;
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const User: User = {
          id: user.uid,
          name: user.displayName || "Anonymous",
          email: user.email || "",
          photoURL: user.photoURL || "",
        };
        setUser(User);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  useEffect(() => {
    if (currency) {
      localStorage.setItem("currency", currency);
    }
  }, [currency]);

  const switchCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  return (
    <Context.Provider
      value={{
        cart,
        cartLength,
        addToCart,
        removeFromCart,
        wishlist,
        wishlistLength,
        addToWishlist,
        removeFromWishlist,
        watches,
        jewellery,
        coupons,
        options,
        user,
        setUser,
        currency,
        switchCurrency,
        exchangeRates,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCart = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
