"use client"
// import { useState } from "react";
// import { CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox"


const SortingSidebar = ({ title, sortingOptions, selectedOption, onValueChange }) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg font-montserratRegular">
      {/* Section Title */}
      <h1 className="text-1xl font-bold mb-6 text-slate-950 font-montserratMedium">{title}</h1>

      {/* Radio Group for Sorting */}
      <RadioGroup
        value={selectedOption}
        onValueChange={onValueChange}
        className="space-y-3"
      >
        {sortingOptions.map((option) => (
          <div
            key={option.id}
            className={`flex items-center space-x-3 cursor-pointer ${
              selectedOption === option.id ? "text-blue-600" : ""
            }`}
          >
            <RadioGroupItem
              id={option.id}
              value={option.id}
              className={`w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center ${
                selectedOption === option.id ? "bg-blue-600" : "bg-white"
              }`}
            >
              {selectedOption === option.id && (
                <span className="w-3 h-3 bg-white rounded-full"></span>
              )}
            </RadioGroupItem>
            <Label htmlFor={option.id} className="text-gray-700 cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {/* Filter Sections */}
      {/* <FilterSection title="Filter By" options={[
        { id: 'available-online', label: 'Available Online' },
        { id: 'new-arrivals', label: 'NEW' },
        { id: 'try-on', label: 'TRY ON' },
      ]} /> */}

      {/* <FilterSection title="Selection for" options={[
        { id: 'her', label: 'Her' },
        { id: 'him', label: 'Him' },
      ]} /> */}

      {/* <FilterSection title="Collection" options={[
        { id: 'tonneau', label: 'Tonneau' },
        { id: 'reflection', label: 'Reflection de Cartier' },
        { id: 'cartier-libre', label: 'CARTIER LIBRE' },
        { id: 'revelation', label: "Révélation d'une Panthère" },
        { id: 'tortue', label: 'Tortue' },
      ]} />

      <FilterSection title="Case Material" options={[
        { id: 'white-gold', label: 'White gold' },
        { id: 'rose-gold', label: 'Rose Gold' },
        { id: 'yellow-gold', label: 'Yellow gold' },
        { id: 'black-steel', label: 'Black Steel' },
        { id: 'platinum', label: 'Platinum' },
      ]} />

      <FilterSection title="Watch Shape" options={[
        { id: 'square', label: 'Square' },
        { id: 'round', label: 'Round' },
        { id: 'rectangular', label: 'Rectangular' },
        { id: 'other', label: 'Other Shapes' },
        { id: 'tonneau-shape', label: 'Tonneau' },
      ]} />

      <FilterSection title="Movement" options={[
        { id: 'automatic', label: 'Automatic winding' },
        { id: 'manual', label: 'Manual winding' },
        { id: 'quartz', label: 'Quartz' },
      ]} />

      <FilterSection title="Bracelet / Strap" options={[
        { id: 'interchangeable', label: 'Interchangeable' },
        { id: 'leather', label: 'Leather' },
        { id: 'metal', label: 'Metal' },
      ]} />

      <FilterSection title="Case Size" options={[
        { id: 'large', label: 'Large model' },
        { id: 'medium', label: 'Medium model' },
        { id: 'small', label: 'Small model' },
        { id: 'carmini', label: 'CARMINIMODEL' },
        { id: 'extra-large', label: 'EXTRALARGEMODEL' },
      ]} /> */}
    </div>
  );
};


// FilterSection Component
const FilterSection = ({ title, options, selectedFilter, onFilterChange }) => {

  const handleCheckboxChange = (filterId) => {
    if (selectedFilter.includes(filterId)) {
      onFilterChange([]);
    } else {
      onFilterChange([filterId]);
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg font-montserratRegular mt-4">
      <h2 className="text-1xl font-bold mb-4 font-montserratMedium">{title}</h2>

      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.id} className="flex items-end space-y-3 space-x-3 cursor-pointer">

             <input type="checkbox" id={option.id} checked={selectedFilter.includes(option.id)} onChange={() => handleCheckboxChange(option.id)} />

            <Label htmlFor={option.id} className="cursor-pointer text-gray-700">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

const CaseMaterialSection = ({ title, options, selectedCase, onCaseChange }) => {

  const handleCheckboxChange = (filterId) => {
    if (selectedCase.includes(filterId)) {
      onCaseChange([]);
    } else {
      onCaseChange([filterId]);
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg font-montserratRegular mt-4">
      <h2 className="text-1xl font-bold mb-4 font-montserratMedium">{title}</h2>

      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.id} className="flex items-end space-y-3 space-x-3 cursor-pointer">

             <input type="checkbox" id={option.id} checked={selectedCase.includes(option.id)} onChange={() => handleCheckboxChange(option.id)} />

            <Label htmlFor={option.id} className="cursor-pointer text-gray-700">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

const WatchShapeSection = ({ title, options, selectedShape, onShapeChange }) => {

  const handleCheckboxChange = (filterId) => {
    if (selectedShape.includes(filterId)) {
      onShapeChange([]);
    } else {
      onShapeChange([filterId]);
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg font-montserratRegular mt-4">
      <h2 className="text-1xl font-bold mb-4 font-montserratMedium">{title}</h2>

      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.id} className="flex items-end space-y-3 space-x-3 cursor-pointer">

             <input type="checkbox" id={option.id} checked={selectedShape.includes(option.id)} onChange={() => handleCheckboxChange(option.id)} />

            <Label htmlFor={option.id} className="cursor-pointer text-gray-700">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export{ SortingSidebar, FilterSection, CaseMaterialSection, WatchShapeSection };