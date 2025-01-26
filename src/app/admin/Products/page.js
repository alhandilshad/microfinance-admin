"use client";
import { Filter, Trash2, Edit2, X, Search } from "lucide-react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../context/Context";
import { useState } from "react";

const ProductList = () => {
  const router = useRouter();
  const { products, fetchProducts } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <main>
        <div className="bg-white rounded-lg border">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6 pb-5 border-b-[1px]">
              <h2 className="text-xl font-semibold">Products list</h2>
              <div className="relative w-full max-w-sm">
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

              <div className="flex items-center space-x-2">
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
                    <th className="py-2 px-4 text-left">Image</th>
                    <th className="py-2 px-4 text-left">Product Name</th>
                    <th className="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-left">Price</th>
                    <th className="py-2 px-4 text-left">Category</th>
                    <th className="py-2 px-4 text-left">Sub Category</th>
                    <th className="py-2 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts?.map((product, index) => (
                      <tr key={index} className="border-b text-sm">
                        <td>
                          <img
                            src={product.imageUrls[0]}
                            className="object-cover"
                            width={70}
                            height={70}
                            alt="watch image"
                          />
                        </td>
                        <td className="py-2 px-4">{product.title}</td>
                        <td className="py-2 text-xs text-gray-500 px-4">
                          <p className="line-clamp-3 text-justify capitalize">
                            {" "}
                            {product.description}{" "}
                          </p>
                        </td>
                        <td className="py-2 px-4">
                          {product.price}
                          <span className="font-thin text-[10px] text-[#1e4846]">
                            /AED
                          </span>
                        </td>
                        <td className="py-2 px-4 ">{product.category}</td>
                        <td className="py-2 px-4">
                          {product.subCategroy || "None"}
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
                      <td colSpan={7} className="py-2 px-4 text-center">
                        No products found. Add some products using the + Add button.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4 py-4">
              <button
                className="px-3 py-1 border rounded text-sm"
                onClick={() => fetchProducts(true)}
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductList;
