"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import { useCart } from "../context/Context";
import { useSearchParams } from "next/navigation";
import type { Product } from "../context/Context";

function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { watches: allWatches } = useCart() as { watches: Product[] };

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  const searchedWatches = useMemo(() => {
    if (!allWatches) return [];
    return allWatches.filter((watch) =>
      watch?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allWatches, searchQuery]);

  return (
    <div className="bg-white font-montserratMedium">
      <Header />
      <div className="container mx-auto p-4 border-b pb-5 mb-2 flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-bold font-domine">
          Showing Results for &quot;{searchQuery}&quot;
        </h1>
        <h1 className="text-1xl font-bold text-slate-950">
          {searchedWatches.length} Results
        </h1>
      </div>
      <div className="p-4 md:w-5/6 mx-auto">
        {searchedWatches.length > 0 ? (
          <>
            <Card products={searchedWatches} />
          </>
        ) : (
          <div className="text-center text-gray-500">
            No watches match your search query.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}