"use client";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { fetchECBExchangeRates } from "../../utils/fetchECBExchangeRates";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";
import { useAppContext } from "../../context/Context";

const page = () => {
  const { rates, ratesUpdateTime, setRates } = useAppContext();
  const [lastUpdated, setLastUpdated] = useState(null);
  const ratesRef = doc(db, "exchangeRates", "latestRates");

  const updateRates = async () => {
    const newRates = await fetchECBExchangeRates();

    if (newRates) {
      const timestamp = new Date().toISOString();

      await setDoc(ratesRef, {
        rates: newRates,
        lastUpdated: timestamp,
      });

      setRates(newRates);
      setLastUpdated(timestamp);
    } else {
      console.error("Failed to fetch exchange rates");
    }
  };

  const checkForUpdate = () => {
    if (!lastUpdated) return;

    const currentTime = new Date();
    const lastUpdateTime = new Date(lastUpdated);
    const timeDifference = currentTime - lastUpdateTime;

    if (timeDifference >= 24 * 60 * 60 * 1000) {
      console.log("More than 24 hours have passed, refreshing rates...");
      updateRates(); // Trigger rates refresh
    } else {
      console.log("Rates are up-to-date.");
    }
  };

  useEffect(() => {
    checkForUpdate();
  }, [lastUpdated]);

  return (
    <main>
      <div className="bg-white rounded-lg border p-5 mb-4 flex flex-row justify-between">
        <h1 className="text-lg font-semibold mb-2">Exchange Rates</h1>
        <div>
          <h3>
            Last Updated:{" "}
            {ratesUpdateTime || lastUpdated
              ? new Date(ratesUpdateTime || lastUpdated).toLocaleString()
              : "Not available"}
          </h3>
          <button
            onClick={updateRates}
            className="px-6 py-1 bg-[#1e4846] text-white rounded text-sm cursor-pointer"
          >
            Refresh Rates
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border md:w-[76vw] w-[90vw] overflow-y-scroll">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left">Currency</th>
                  <th className="text-left">Rate</th>
                </tr>
              </thead>
              <tbody>
                {rates &&
                  Object.entries(rates).map(([currency, rate]) => (
                    <tr key={currency} className="border-b">
                      <td className="py-3 px-4">{currency}</td>
                      <td className="py-3 px-4">
                        {typeof rate === "object" ? JSON.stringify(rate) : rate}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
