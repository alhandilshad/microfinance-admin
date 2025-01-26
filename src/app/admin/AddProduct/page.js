"use client";
import { useEffect, useState, Suspense } from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  // getDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
// import Image from "next/image";
import axios from "axios";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../context/Context";

const Page = () => {
  const { fetchProducts, categories, setProducts } = useAppContext();
  const [product, setProduct] = useState();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategroy, setSubCategroy] = useState("");
  const [gender, setGender] = useState("");
  const [id, setId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [productType, setProductType] = useState("watch");
  const [caseMaterial, setCaseMaterial] = useState("");
  const [watchShape, setWatchShape] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [hidePrice, setHidePrice] = useState(false);

  useEffect(() => {
    if (searchParams) {
      const data = searchParams.get("product");
      const parsedData = JSON.parse(data);
      try {
        setHidePrice(parsedData?.hidePrice || false);
        setProduct(parsedData);
        setTitle(parsedData?.title || "");
        setPrice(parsedData?.price || "");
        setDescription(parsedData?.description || "");
        setCategory(parsedData?.category || "");
        setSubCategroy(parsedData?.subCategroy || "");
        setGender(parsedData?.gender || "");
        setImageUrls(parsedData?.imageUrls || []);
        setPreviewUrls(parsedData?.imageUrls || []);
        setCaseMaterial(parsedData?.caseMaterial || "");
        setSelectedOptions(parsedData?.selectedOptions || []);
        console.log("parsedData", parsedData);
      } catch (error) {
        console.log("error", error.message);
      }
    }
  }, [searchParams]);

  const subCat = categories.find(
    (item) => item.category === category
  )?.subcategories;

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "dqzknasup");

    try {
      setIsUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dqzknasup/image/upload`,
        formData
      );
      setImageUrls((prev) => [...prev, response.data.secure_url]);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      alert("Image upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...previews]);

      files.forEach((file) => handleImageUpload(file));
    }
  };

  const handleRemoveImage = (index) => {
    const newPreviews = [...previewUrls];
    const newImages = [...imageUrls];
    newPreviews.splice(index, 1);
    newImages.splice(index, 1);
    setPreviewUrls(newPreviews);
    setImageUrls(newImages);
  };

  // }

  const handleSave = async () => {
    if (!title) {
      alert("Title is required");
      return;
    }
    if (!price) {
      alert("Price is required");
      return;
    }
    if (!description) {
      alert("Description is required");
      return;
    }
    if (!caseMaterial) {
      alert("Case material is required");
      return;
    }
    if (!watchShape) {
      alert("Watch shape is required");
      return;
    }
    if (imageUrls.length === 0) {
      alert("At least one image is required");
      return;
    }
    // if (subCat?.length > 0 && !subCategroy) {
    //   alert("Please select SubCategory");
    //   return;
    // }

    try {
      const productData = {
        imageUrls,
        title,
        price: Number(price),
        description,
        caseMaterial,
        watchShape,
        category,
        subCategroy,
        selectedOptions,
        gender,
        createdAt: serverTimestamp(),
        uid: id,
        productType,
        hidePrice,
      };

      const docRef = await addDoc(collection(db, "products"), productData);
      const newProduct = { id: docRef.id, ...productData };
      setProducts((prevProducts) => [newProduct, ...prevProducts]);

      setTitle("");
      setPrice();
      setDescription("");
      setImageUrls([]);
      setPreviewUrls([]);
      setCategory("");
      setSelectedOptions("");
      setIsClicked(false);
      setGender("");
      setCaseMaterial("");
      setWatchShape("");
      setHidePrice(false);

      router.back();
    } catch (error) {
      console.log(error)
      alert("Error saving product. Please try again.");
    }
  };

  const handleFilterChange = (e) => {
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, e.target.name]);
    } else {
      setSelectedOptions(
        selectedOptions.filter((value) => value !== e.target.name)
      );
    }
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "productType":
        setTitle(e.target.value);
        break;
      case "title":
        setTitle(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      case "subCategroy":
        setSubCategroy(e.target.value);
        break;
      case "hidePrice":
        setHidePrice(e.target.checked);
        hidePrice ? setIsClicked(true): setIsClicked(false);
        break;
      case "selectedOptions":
        if (e.target.checked) {
          setSelectedOptions([...selectedOptions, e.target.name]);
        } else {
          setSelectedOptions(
            selectedOptions.filter((value) => value !== e.target.name)
          );
        }
        break;
      case "gender":
        setGender(e.target.value);
        break;
    }
  };

  const handleUpdate = async () => {
    const productRef = doc(db, "products", product.id);
    await updateDoc(productRef, {
      title: title || "",
      price: Number(price) || "",
      description: description || "",
      category: category || "",
      subCategroy: subCategroy || "",
      selectedOptions: selectedOptions || "",
      gender: gender || "",
      imageUrls: imageUrls || "",
      caseMaterial: caseMaterial || "",
      watchShape: watchShape || "",
      hidePrice: hidePrice || false,
    });
    fetchProducts();
    router.back();
    console.log("updateDoc");
  };

  const handleCancel = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setImageUrls("");
    setCategory("");
    setSubCategroy("");
    router.back();
  };

  return (
    <>
      <main>
        <div className="bg-white rounded-lg border">
          <div className="md:p-6 p-3 container mx-auto">
            {product ? (
              <div>
                <div className="flex flex-col md:flex-row justify-between gap-5 pb-5 md:items-center">
                  <h3 className="md:text-3xl text-lg font-extrabold">
                    {" "}
                    Edit Product
                  </h3>
                  <div>
                    <label className=" mb-1">Product Type</label>
                    <select
                      className="px-3 py-2 border rounded"
                      name="productType"
                      value={productType}
                      onChange={handleInputChange}
                    >
                      <option value="watch">Watch</option>
                      <option value="jewellery">Jewellery</option>
                    </select>
                  </div>
                </div>

                <div className="flex md:flex-row flex-col justify-between gap-5 mb-5">
                  <div className="md:w-3/4 shadow border py-5 rounded-xl p-5">
                    <div className="w-full mb-5">
                      <label className="block mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border placeholder:text-black rounded"
                        placeholder="Enter Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Description</label>
                      <textarea
                        type="text"
                        className="w-full px-3 py-2 border placeholder:text-black rounded"
                        placeholder="Enter Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* price section */}
                  <div className="md:w-2/5 border shadow py-5 rounded-xl">
                    <div className="border-b px-5 p-3  text-lg">Pricing</div>
                    <div className="p-3 flex justify-between items-end w-full px-5">
                      <div className="w-full">
                        <label className="block mb-1">Price</label>
                        <input
                          type="text"
                          className="w-full placeholder:text-black  px-3 py-2 border rounded"
                          placeholder="0.00"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="p-2 rounded border">AED</div>
                    </div>
                    <div className="px-5">
                        <button className={`${isClicked ? ('border-blue-500'):('border-black')} border-dashed border rounded p-4 w-full cursor-pointer flex gap-2 justify-center items-center`} 
                        onClick={() => setIsClicked(!isClicked)}
                        >
                          <input checked={hidePrice} name="hidePrice" type="checkbox" onClick={handleInputChange}/>
                           Hide Price
                          </button>
                      </div>
                  </div>
                </div>

                {/* image box */}
                <div className="md:w-full mb-5 border shadow py-5 rounded-xl">
                  <div
                    className="border-b px-5 p-3  text-lg"
                    onClick={handleFileChange}
                  >
                    <div className="cursor-pointer">Upload image</div>
                  </div>
                  <div className="p-3 w-full px-5 flex h-32">
                    <div className="flex space-x-3">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Uploaded ${index}`}
                            className="w-32 h-full object-cover border rounded"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="bg-white p-1 rounded-full absolute top-2 right-2"
                          >
                            <X color="black" size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      id="fileUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e)}
                    />
                    <label
                      htmlFor="fileUpload"
                      className="w-32 mx-3 flex justify-center items-center border p-5 h-full border-dashed rounded-sm border-black"
                    >
                      <span className="bg-black text-white px-3.5 py-1 text-3xl rounded-full">
                        +
                      </span>
                    </label>
                  </div>
                </div>

                {/* categories and optional watches */}
                <div className="md:w-full mb-5 border shadow py-5 rounded-xl  p-5">
                  <div className="flex md:flex-row flex-col gap-5 mb-5">
                    <div className="w-full">
                      <label className="block mb-2">Case Material</label>
                      <select
                        className="w-full px-3 py-2 border rounded"
                        value={caseMaterial}
                        onChange={(e) => setCaseMaterial(e.target.value)}
                      >
                        <option value="">Select Case Material</option>
                        <option value="white-gold">White Gold</option>
                        <option value="rose-gold">Rose Gold</option>
                        <option value="yellow-gold">Yellow Gold</option>
                        <option value="black-steel">Black Steel</option>
                        <option value="platinum">Platinum</option>
                        <option value="steel">Steel</option>
                        <option value="gold-steel">Gold and Steel</option>
                      </select>
                    </div>

                    <div className="w-full">
                      <label className="block mb-2">Watch Shape</label>
                      <select
                        className="w-full px-3 py-2 border rounded"
                        value={watchShape}
                        onChange={handleInputChange}
                      >
                        <option value="square">Square</option>
                        <option value="round">Round</option>
                        <option value="rectangular">Rectangular</option>
                        <option value="other-shapes">Other Shapes</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex md:flex-row flex-col gap-5 mb-5">
                    <div className="w-full">
                      <label className="block  mb-2">Category</label>
                      <select
                        className="w-full px-3 py-2 border rounded"
                        value={category}
                        name="category"
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category</option>
                        {categories?.map((cat) => (
                          <option key={cat.id} value={cat.category}>
                            {cat.category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {category && (
                      <div className="w-full">
                        <label className="block  mb-2">Sub Category</label>
                        <select
                          className="w-full px-3 py-2 border rounded"
                          value={subCategroy}
                          name="subCategroy"
                          onChange={handleInputChange}
                        >
                          <option value="">Select SubCategory</option>
                          {subCat?.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-row flex-col gap-5 mb-5">
                    <div className="w-full rounded-xl shadow p-5">
                      <label className="block mb-2">Select Filter</label>
                      <label className="flex text-gray-500 gap-2 mt-2">
                        <input
                          type="checkbox"
                          name="newestArrivals"
                          value={selectedOptions}
                          onChange={handleInputChange}
                        />
                        Newest Arrival
                      </label>
                      <label className="flex text-gray-500 gap-2 mt-2">
                        <input
                          type="checkbox"
                          name="bestSelling"
                          value={selectedOptions}
                          onChange={handleInputChange}
                        />
                        Best Seling
                      </label>
                    </div>

                    <div className="w-full">
                      <label className="block  mb-1">Gender</label>
                      <select
                        className="w-full px-3 py-2 border rounded"
                        value={gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="her">her</option>
                        <option value="him">him</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 rounded"
                    onClick={() => {
                      setTitle("");
                      setPrice("");
                      setDescription("");
                      setImageUrls("");
                      setCategory("");
                      setSubCategroy("");
                      router.back();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-black text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col md:flex-row justify-between gap-5 pb-5 md:items-center">
                <h3 className="md:text-3xl text-lg ">Add Product</h3>
                  <div>
                    <label className="mb-1 p-2">Product Type</label>
                    <select className="px-3 py-2 border rounded" value={productType} onChange={(e) => setProductType(e.target.value)}>
                      <option value="watch">Watch</option>
                      <option value="jewellery">Jewellery</option>
                    </select>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col justify-between gap-5 mb-5">
                  <div className="md:w-3/4 shadow border py-5 rounded-xl p-5">
                    <div className="w-full mb-5">
                      <label className="block mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border placeholder:text-black rounded"
                        placeholder="Enter Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block mb-2">Description</label>
                      <textarea
                        className="w-full px-3 py-2 border placeholder:text-black rounded"
                        placeholder="Enter Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8}
                      />
                    </div>
                  </div>

                  {/* price section */}
                  <div className="md:w-2/5 border shadow py-5 rounded-xl">
                    <div className="border-b px-5 p-3  text-lg">Pricing</div>
                      <div className="p-3 flex justify-between items-end w-full px-5">
                        <div className="w-full">
                          <label className="block mb-1">Price</label>
                          <input type="text" className="w-full placeholder:text-black  px-3 py-2 border rounded"
                            placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        <div className="p-2 rounded border">AED</div>
                      </div>
                      <div className="px-5">
                        <button className={`${isClicked ? ('border-blue-500'):('border-black')} border-dashed border rounded p-4 w-full cursor-pointer flex gap-2 justify-center items-center`} onClick={()=> {setIsClicked(true)}}>
                          <input type="checkbox" onClick={(e)=> {e.target.checked ? setHidePrice(true): setHidePrice(false)}}/>
                           Hide Price
                          </button>
                      </div>
                  </div>
                </div>

                {/* image box */}
                <div className="md:w-full mb-5 border shadow py-5 rounded-xl">
                  <div
                    className="border-b px-5 p-3  text-lg"
                    onClick={handleFileChange}
                  >
                    <div className="cursor-pointer">Upload image</div>
                  </div>
                  <div className="p-3 w-full px-5 flex h-32">
                    <div className="flex space-x-3">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Uploaded ${index}`}
                            className="w-32 h-full object-cover border rounded"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="bg-white p-1 rounded-full absolute top-2 right-2"
                          >
                            <X color="black" size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      id="fileUpload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e)}
                    />
                    <label
                      htmlFor="fileUpload"
                      className="w-32 mx-3 flex justify-center items-center border p-5 h-full border-dashed rounded-sm border-black"
                    >
                      <span className="bg-black text-white px-3.5 py-1 text-3xl rounded-full">
                        +
                      </span>
                    </label>
                  </div>
                </div>

                {productType === "watch" ? (
                  <div>
                    {/* categories and optional watches */}
                    <div className="md:w-full mb-5 border shadow py-5 rounded-xl  p-5">
                      <div className="flex md:flex-row flex-col gap-5 mb-5">
                        <div className="w-full">
                          <label className="block mb-2">Case Material</label>
                          <select
                            className="w-full px-3 py-2 border rounded"
                            value={caseMaterial}
                            onChange={(e) => setCaseMaterial(e.target.value)}
                          >
                            <option value="">Select Case Material</option>
                            <option value="white-gold">White Gold</option>
                            <option value="rose-gold">Rose Gold</option>
                            <option value="yellow-gold">Yellow Gold</option>
                            <option value="black-steel">Black Steel</option>
                            <option value="platinum">Platinum</option>
                            <option value="steel">Steel</option>
                            <option value="gold-steel">Gold and Steel</option>
                          </select>
                        </div>

                        <div className="w-full">
                          <label className="block mb-2">Watch Shape</label>
                          <select
                            className="w-full px-3 py-2 border rounded"
                            value={watchShape}
                            onChange={(e) => setWatchShape(e.target.value)}
                          >
                            <option value="">Select Watch Shape</option>
                            <option value="square">Square</option>
                            <option value="round">Round</option>
                            <option value="rectangular">Rectangular</option>
                            <option value="other-shapes">Other Shapes</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex md:flex-row flex-col gap-5 mb-5">
                        <div className="w-full">
                          <label className="block  mb-2">Category</label>
                          <select
                            className="w-full px-3 py-2 border rounded"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Select Category</option>
                            {categories?.map((cat) => (
                              <option key={cat.id} value={cat.category}>
                                {cat.category}
                              </option>
                            ))}
                          </select>
                        </div>

                        {category && (
                          <div className="w-full">
                            <label className="block  mb-2">Sub Category</label>
                            <select
                              className="w-full px-3 py-2 border rounded"
                              value={subCategroy}
                              onChange={(e) => setSubCategroy(e.target.value)}
                            >
                              <option value="">Select SubCategory</option>
                              {subCat?.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      <div className="flex md:flex-row flex-col gap-5 mb-5">
                        <div className="w-full rounded-xl shadow p-5">
                          <label className="block mb-2">Select Filter</label>
                          <label className="flex text-gray-500 gap-2 mt-2">
                            <input
                              type="checkbox"
                              name="newestArrivals"
                              value={selectedOptions}
                              onChange={handleFilterChange}
                            />
                            Newest Arrival
                          </label>
                          <label className="flex text-gray-500 gap-2 mt-2">
                            <input
                              type="checkbox"
                              name="bestSelling"
                              value={selectedOptions}
                              onChange={handleFilterChange}
                            />
                            Best Seling
                          </label>
                        </div>

                        <div className="w-full">
                          <label className="block  mb-1">Gender</label>
                          <select
                            className="w-full px-3 py-2 border rounded"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                          >
                            <option value="">Select Gender</option>
                            <option value="her">her</option>
                            <option value="him">him</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex md:flex-row flex-col gap-5 mb-5">
                    <div className="w-full rounded-xl shadow p-5">
                      <label className="block mb-2">Select Filter</label>
                      <label className="flex text-gray-500 gap-2 mt-2">
                        <input
                          type="checkbox"
                          name="newestArrivals"
                          value={selectedOptions}
                          onChange={handleFilterChange}
                        />
                        Newest Arrival
                      </label>
                      <label className="flex text-gray-500 gap-2 mt-2">
                        <input
                          type="checkbox"
                          name="bestSelling"
                          value={selectedOptions}
                          onChange={handleFilterChange}
                        />
                        Best Seling
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#1e4846] text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default function AddProduct() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
