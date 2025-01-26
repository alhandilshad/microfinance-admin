"use client";
import { useState, useMemo } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import { X } from "lucide-react";
import Banner from "../components/Banners";
import { useCart } from "../context/Context";
import {
  SortingSidebar,
  FilterSection,
  PriceRangeSection,
} from "../components/SortingSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import PriceDisplay from "../components/PriceDisplay";

export default function Store() {
  const { jewellery: allJewellery, currency } = useCart();
  const [selectedOption, setSelectedOption] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSorterOpen, setIsSorterOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);
  const toggleSorter = () => setIsSorterOpen((prev) => !prev);
  const togglePrice = () => setIsPriceOpen((prev) => !prev);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filterOptions = {
    options: [
      { id: "new", label: "New" },
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
  // Sorting Logic
  const sortedWatches = useMemo(() => {
    if (!allJewellery) return [];
    let sorted = [...allJewellery];
    if (selectedOption === "low-to-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selectedOption === "high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (selectedOption === "newest") {
      sorted = sorted.filter(
        (watch) =>
          Array.isArray(watch.selectedOptions) &&
          watch.selectedOptions.includes("Newest Arrival")
      );
    } else if (selectedOption === "best-sellers") {
      sorted = sorted.filter(
        (watch) =>
          Array.isArray(watch.selectedOptions) &&
          watch.selectedOptions.includes("Best Selling")
      );
    }
    return sorted;
  }, [allJewellery, selectedOption]);

  // Filtering Logic
  const filteredJewellery = useMemo(() => {
    if (!sortedWatches) return [];
    let filtered = [...sortedWatches];

    if (selectedFilters.includes("new")) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt?.nanoseconds).getTime();
        const dateB = new Date(b.createdAt?.nanoseconds).getTime();
        return (dateB || 0) - (dateA || 0);
      });
    }

    if (selectedFilters.includes("her") || selectedFilters.includes("him")) {
      filtered = filtered.filter((watch) =>
        selectedFilters.some((filterId) => filterId === watch.gender)
      );
    }

    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter(
        (watch) => watch.price >= minPrice && watch.price <= maxPrice
      );
      setIsPriceOpen(false);
    }

    return filtered;
  }, [sortedWatches, selectedFilters, minPrice, maxPrice]);

  return (
    <div className="bg-white font-montserratMedium">
      <Header />
      <div className="container mx-auto">
        <Banner
          image="/ALL-WATCHES.avif"
          title="All Jewellery"
          description="At Cartier, everything begins with the design. The Maison’s obsession for pure lines, precise shapes and precious details has led to design objects that defy the decades."
        />

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
          </div>

          {/* Main Content */}
          <div className="p-4 md:w-5/6">
            <div className="flex flex-row justify-between">
              <h1 className="text-1xl font-bold mb-4 text-slate-950 font-montserratSemiBold">
                {filteredJewellery.length} Models
              </h1>
            </div>

            {filteredJewellery.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[...Array(12)].map((_, index) => (
                  <Skeleton key={index} className="w-full h-72 bg-gray-200" />
                ))}
              </div>
            ) : (
              <Card products={filteredJewellery} />
            )}
            {/* <Card products={filteredJewellery} /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
