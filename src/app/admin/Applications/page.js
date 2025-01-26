"use client";
import { Filter, Trash2, Edit2, X, Search } from "lucide-react";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "form"));
      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "form", id));
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <main>
        <div className="bg-white rounded-lg border">
          <div className="md:p-6 p-3">
            <div className="flex md:flex-row gap-5 flex-col justify-between items-center mb-6 pb-5 border-b-[1px]">
              <div className="flex w-full justify-between">
                <h2 className="text-xl font-semibold">Products list</h2>
                <div className="relative md:w-full max-w-sm">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-full px-5 py-2 pl-10 text-sm shadow-sm focus:outline-none focus:border-[#1e4846] focus:ring-1 focus:ring-[#1e4846] transition duration-300"
                  />
                  <Search
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div className="flex md:w-2/4 justify-end items-center space-x-2">
                <button className="px-3 py-1 border rounded text-sm flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <button className="px-3 py-1 border rounded text-sm">
                  See All
                </button>
                <Link href="/admin/AddProduct">
                  <button className="px-3 py-1 bg-[#1e4846] text-white rounded text-sm">
                    + Add
                  </button>
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto w-96 md:w-auto  overflow-scroll">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Address</th>
                    <th className="py-2 px-4 text-left">Phone</th>
                    <th className="py-2 px-4 text-left">Loan Amount</th>
                    <th className="py-2 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <tr key={index} className="border-b text-sm">
                        <td className="py-2 px-4 text-xs md:text-sm">
                          {product.name}
                        </td>
                        <td className="py-2 px-4 text-xs md:text-sm">
                          {product.address}
                        </td>
                        <td className="py-2 px-4 text-xs md:text-sm">
                          {product.phoneNumber}
                        </td>
                        <td className="py-2 px-4 text-xs md:text-sm">
                          {product.loanAmount} AED
                        </td>
                        <td className="py-2 px-4 text-right">
                          <button
                            onClick={() => {
                              router.push(
                                `/admin/AddProduct?product=${encodeURIComponent(
                                  JSON.stringify(product)
                                )}`
                              );
                            }}
                            className="text-blue-600 mx-1"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 mx-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b text-sm">
                      <td colSpan={5} className="py-2 px-4 text-center">
                        No products found. Add some products using the + Add button.
                      </td>
                    </tr>
                  )}
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