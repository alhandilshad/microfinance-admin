"use client";
import { Filter, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { useAppContext } from "../../context/Context";

const ProductList = () => {
  const { categories } = useAppContext();
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [isCategory, setIsCategory] = useState(false);
  const [isSubCategory, setIsSubCategory] = useState(false);

  const handleAddCategory = async () => {
    if (!name) {
      alert("Please Enter a Category");
      return;
    }
    setIsCategory(true);
    await addDoc(collection(db, "categories"), {
      category: name,
      subcategories: [],
    });
    setIsCategory(false);
    setName("");
    setParentCategory("");
    getCategories();
  };

  const handleAddSubCategory = async () => {
    if (!subCategory || !parentCategory) {
      alert("Please Select a Parent Category");
      return;
    }
    setIsSubCategory(true);
    const parentDoc = doc(db, "categories", parentCategory);
    const parentData = categories.find((cat) => cat.id === parentCategory);
    const updatedSubcategories = [
      ...(parentData.subcategories || []),
      subCategory,
    ];
    await updateDoc(parentDoc, { subcategories: updatedSubcategories });
    setIsSubCategory(false);
    setSubCategory("");
    getCategories();
    setParentCategory("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;
    await deleteDoc(doc(db, "categories", id));
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <>
      <main>
        <div className="bg-white rounded-lg border p-5 mb-4">
          <h1 className="text-lg font-semibold mb-2">Add Category</h1>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:border-gray-500 focus:ring focus:ring-gray-200 focus:outline-none"
              placeholder="Category Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={handleAddCategory}
              disabled={isCategory}
              className="px-6 py-1 bg-[#1e4846] text-white rounded text-sm"
            >
              {isCategory ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-5 mb-4">
          <h1 className="text-lg font-semibold mb-2">Add SubCategory</h1>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:border-gray-500 focus:ring focus:ring-gray-200 focus:outline-none"
              placeholder="Category Title"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            />

            <select
              className="w-full px-3 py-2 border rounded focus:border-gray-500 focus:ring focus:ring-gray-200 focus:outline-none"
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddSubCategory}
              disabled={isSubCategory}
              className="px-6 py-1 bg-[#1e4846] text-white rounded text-sm"
            >
              {isSubCategory ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left">Category Title</th>
                    <th className="text-left">Subcategories</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">
                        {item.subcategories && item.subcategories.length > 0
                          ? item.subcategories.join(", ")
                          : "None"}
                      </td>
                      <td className="text-right px-4">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductList;
