"use client";
import { useState, useMemo } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import Banner from "../components/Banners";
import { useCart } from "../context/Context";
import {
  SortingSidebar,
  FilterSection,
  CaseMaterialSection,
  WatchShapeSection,
} from "../components/SortingSidebar";
import type { Product } from "../context/Context";
// import Link from "next/link";
import { X } from "lucide-react";
import PriceDisplay from "../components/PriceDisplay";
// import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewArrivals() {
  const { watches, jewellery } = useCart();
  const { currency } = useCart();
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCase, setSelectedCase] = useState<string[]>([]);
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSorterOpen, setIsSorterOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isCaseOpen, setIsCaseOpen] = useState(false);
  const [isShapeOpen, setIsShapeOpen] = useState(false);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);
  const toggleSorter = () => setIsSorterOpen((prev) => !prev);
  const togglePrice = () => setIsPriceOpen((prev) => !prev);
  const toggleCase = () => setIsCaseOpen((prev) => !prev);
  const toggleShape = () => setIsShapeOpen((prev) => !prev);

  const filteredWatches = useMemo(() => {
    return watches.filter((watch) => 
      watch.selectedOptions && watch.selectedOptions.includes("Newest Arrival")
    );
  }, [watches]);

  const filteredJewellery = useMemo(() => {
    return jewellery.filter((item) => item.selectedOptions?.includes("Newest Arrival"));
  }, [jewellery]);

  const filterOptions = {
    options: [
      // { id: "available-online", label: "Available Online" },
      { id: "new", label: "New" },
      // { id: "try-on", label: "TRY ON" },
      { id: "her", label: "Her" },
      { id: "him", label: "Him" },
    ],
  };
  const sortingOptions = {
    options: [
      { id: "low-to-high", label: "Price: Low to High" },
      { id: "high-to-low", label: "Price: High to Low" },
      { id: "newest", label: "Newest Arrivals" },
      { id: "best-sellers", label: "Best Sellers" },
    ],
  };
  const caseOptions = {
    options: [
      { id: "white-gold", label: "White Gold" },
      { id: "rose-gold", label: "Rose Gold" },
      { id: "yellow-gold", label: "Yellow Gold" },
      { id: "black-steel", label: "Black Steel" },
      { id: "platinum", label: "Patinum" },
      { id: "steel", label: "Steel" },
      { id: "gold-steel", label: "Gold and Steel" },
    ],
  };
  const shapeOptions = {
    options: [
      { id: "square", label: "Square" },
      { id: "round", label: "Round" },
      { id: "rectangular", label: "Rectangular" },
      { id: "other-shapes", label: "Other Shapes" },
    ],
  };

  // Sorting Logic
  const sortedWatches = useMemo(() => {
    // if (!allWatches) return [];
    let sorted = [...filteredWatches, ...filteredJewellery];
    if (selectedOption === "low-to-high") {
      sorted.sort((a, b) => a.price - b.price);
      setIsSorterOpen(false);
    } else if (selectedOption === "high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
      setIsSorterOpen(false);
    } else if (selectedOption === "newest") {
      sorted = sorted.filter(
        (watch) =>
          Array.isArray(watch.selectedOptions) &&
          watch.selectedOptions.includes("Newest Arrival")
      );
      setIsSorterOpen(false);
    } else if (selectedOption === "best-sellers") {
      sorted = sorted.filter(
        (watch) =>
          Array.isArray(watch.selectedOptions) &&
          watch.selectedOptions.includes("Best Seling")
      );
      setIsSorterOpen(false);
    }
    return sorted;
  }, [filteredWatches, filteredJewellery, selectedOption]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    if (!sortedWatches) return [];
    let filtered = [...sortedWatches];

    if (selectedFilters.includes("new")) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt?.nanoseconds).getTime();
        const dateB = new Date(b.createdAt?.nanoseconds).getTime();
        return (dateB || 0) - (dateA || 0);
      });
      setIsFilterOpen(false);
    }

    if (selectedFilters.includes("her") || selectedFilters.includes("him")) {
      filtered = filtered.filter((watch) =>
        selectedFilters.some((filterId) => filterId === watch.gender)
      );
      setIsFilterOpen(false);
    }

    if (
      selectedCase.includes("white-gold") ||
      selectedCase.includes("rose-gold") ||
      selectedCase.includes("yellow-gold") ||
      selectedCase.includes("black-steel") ||
      selectedCase.includes("platinum") ||
      selectedCase.includes("steel") ||
      selectedCase.includes("gold-steel")
    ) {
      filtered = filtered.filter((watch) =>
        selectedCase.some((filterId) => filterId === watch?.caseMaterial)
      );
      setIsCaseOpen(false);
    }

    if (
      selectedShape.includes("square") ||
      selectedShape.includes("round") ||
      selectedShape.includes("rectangular") ||
      selectedShape.includes("other-shapes")
    ) {
      filtered = filtered.filter((watch) =>
        selectedShape.some((filterId) => filterId === watch?.shape)
      );
      setIsShapeOpen(false);
    }

    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter(
        (watch) => watch.price >= minPrice && watch.price <= maxPrice
      );
      setIsPriceOpen(false);
    }

    return filtered;
  }, [
    sortedWatches,
    selectedFilters,
    selectedCase,
    selectedShape,
    minPrice,
    maxPrice,
  ]);

  return (
    <div className="bg-white font-montserratMedium">
      <Header />
      <div className="container mx-auto">
      <div className="p-10 md:py-20 md:rounded-md bg-[#2c5150]">
        <div className="md:w-4/5">
          <h1 className="md:text-5xl text-2xl mb-5 font-montserratSemiBold text-[#bfdace]">Weekly New Arrivals</h1>
          <p className="text-[#bfdace] md:text-base text-xs font-montserratSemiBold">If you’d like to be the first to secure some of our most coveted pieces, check our New Arrivals page with new, pre-owned & vintage models! Each watch is inspected for quality and authenticity in our in-house service center.</p>
        </div>
      </div>

        <div className="md:hidden flex items-center justify-evenly border-t border-b">
          <div className="p-4" onClick={toggleFilter}>
            <h1>FILTER BY</h1>
          </div>
          <div className="p-4" onClick={toggleSorter}>
            <h1>SORT BY</h1>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-evenly border-t border-b">
          <div className="p-4" onClick={togglePrice}>
            <h1>PRICE RANGE</h1>
          </div>
          <div className="p-4" onClick={toggleCase}>
            <h1>CASE MATERIAL</h1>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-evenly border-t border-b">
          <div className="p-4" onClick={toggleShape}>
            <h1>WATCH SHAPE</h1>
          </div>
        </div>

        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white p-5 flex flex-col items-center gap-5 transform transition-transform duration-300 z-10  ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1 className="font-montserratSemiBold text-lg border-b text-[#1e4846] border-black w-full text-center p-3">
            FILTER BY
          </h1>
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={toggleFilter}
          >
            <X />
          </div>
          <FilterSection
            title="Filter By"
            options={filterOptions.options}
            selectedFilter={selectedFilters}
            onFilterChange={setSelectedFilters}
          />
        </div>

        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white p-5 flex flex-col items-center gap-5 transform transition-transform duration-300 z-10  ${
            isSorterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1 className="font-montserratSemiBold text-lg border-b text-[#1e4846] border-black w-full text-center p-3">
            SORTED BY
          </h1>
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={toggleSorter}
          >
            <X />
          </div>
          <SortingSidebar
            title="Sort By"
            sortingOptions={sortingOptions.options}
            selectedOption={selectedOption}
            onValueChange={setSelectedOption}
          />
        </div>

        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white p-5 flex flex-col items-center gap-5 transform transition-transform duration-300 z-10  ${
            isPriceOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1 className="font-montserratSemiBold text-lg border-b text-[#1e4846] border-black w-full text-center p-3">
            PRICE RANGE
          </h1>
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={togglePrice}
          >
            <X />
          </div>
          <div className="w-full p-4 bg-white rounded-lg font-montserratRegular mt-4">
            <h2 className="text-1xl font-bold mb-4 font-montserratMedium">
              Price Range
            </h2>
            <div className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="min-price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Min Price
                </label>
                <input
                  id="min-price"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="max-price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max Price
                </label>
                <input
                  id="max-price"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white p-5 flex flex-col items-center gap-5 transform transition-transform duration-300 z-10  ${
            isCaseOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1 className="font-montserratSemiBold text-lg border-b text-[#1e4846] border-black w-full text-center p-3">
            CASE MATERIAL
          </h1>
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={toggleCase}
          >
            <X />
          </div>
          <CaseMaterialSection
            title="Case Material"
            options={caseOptions.options}
            selectedCase={selectedCase}
            onCaseChange={setSelectedCase}
          />
        </div>

        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white p-5 flex flex-col items-center gap-5 transform transition-transform duration-300 z-10  ${
            isShapeOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1 className="font-montserratSemiBold text-lg border-b text-[#1e4846] border-black w-full text-center p-3">
            WATCH SHAPE
          </h1>
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={toggleShape}
          >
            <X />
          </div>
          <WatchShapeSection
            title="Watch Shape"
            options={shapeOptions.options}
            selectedShape={selectedShape}
            onShapeChange={setSelectedShape}
          />
        </div>

        <div className="w-full flex flex-row my-12 justify-between md:px-8">
          <div className="md:block hidden flex flex-col">
            <SortingSidebar
              title="Sort By"
              sortingOptions={sortingOptions.options}
              selectedOption={selectedOption}
              onValueChange={setSelectedOption}
            />
            <FilterSection
              title="Filter By"
              options={filterOptions.options}
              selectedFilter={selectedFilters}
              onFilterChange={setSelectedFilters}
            />
            <div className="w-full p-4 bg-white rounded-lg font-montserratRegular mt-4">
              <h2 className="text-1xl font-bold mb-4 font-montserratMedium">
                Price Range
              </h2>
              <div className="flex flex-col space-y-4">
                <div>
                  <label
                    htmlFor="min-price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Min Price
                  </label>
                  <input
                    id="min-price"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="max-price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Max Price
                  </label>
                  <input
                    id="max-price"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <CaseMaterialSection
              title="Case Material"
              options={caseOptions.options}
              selectedCase={selectedCase}
              onCaseChange={setSelectedCase}
            />
            <WatchShapeSection
              title="Watch Shape"
              options={shapeOptions.options}
              selectedShape={selectedShape}
              onShapeChange={setSelectedShape}
            />
          </div>
          {/* Main Content */}
          <div className="p-4 md:w-5/6">
            <div className="flex flex-row justify-between">
              <h1 className="text-1xl font-bold mb-4 text-slate-950 font-montserratSemiBold">
                {filteredProducts.length} Models
              </h1>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[...Array(12)].map((_, index) => (
                  <Skeleton key={index} className="w-full h-72 bg-gray-200" />
                ))}
              </div>
            ) : (
              <Card products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}