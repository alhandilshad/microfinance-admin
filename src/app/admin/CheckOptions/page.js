"use client"
import { db } from '../../utils/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Edit, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/Context';

const page = () => {
    const { extras } = useAppContext();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [isEdit, setisEdit] = useState(false);
    const [editId, setEditId] = useState('');

      const handleAddCheckout = async () => {
        if (!title || !price) {
          alert("Please Enter a Category");
          return;
        }
        if(isEdit){
            await updateDoc(doc(db, "CheckOutOptions", editId), {
                title,
                price,
            });
            setEditId('');
            setisEdit(false);
        }else{
            await addDoc(collection(db, "CheckOutOptions"), {
                title,
                price,
            });
        }
        setTitle("");
        setPrice("");
      };


      const handleDelete = async (id) => {
        await deleteDoc(doc(db, "CheckOutOptions", id));
      }

  return (
    <main>
        <div className="bg-white rounded-lg border p-5 mb-4">
          <h1 className="text-lg font-semibold mb-2">{isEdit ? 'Update CheckOut Options' : 'Add CheckOut Options'}</h1>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:border-gray-500 focus:ring focus:ring-gray-200 focus:outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              className="w-full px-3 py-2 border rounded focus:border-gray-500 focus:ring focus:ring-gray-200 focus:outline-none"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button
              onClick={handleAddCheckout}
              className="px-6 py-1 bg-[#1e4846] text-white rounded text-sm"
            >
              {isEdit ? 'UPDATE' : 'ADD'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left">CheckOut Title</th>
                    <th className="text-left">Price</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {extras?.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-4">{item.title}</td>
                      <td className="py-3 px-4">{item.price}</td>
                      <td className="py-3 px-4">
                        <div className='flex items-center justify-end gap-2'>
                        <Edit className='h-5 w-5 cursor-pointer' onClick={() => {
                            setTitle(item.title);
                            setPrice(item.price);
                            setEditId(item.id);
                            setisEdit(true);
                        }} />
                        <Trash2 className="h-5 w-5 cursor-pointer" onClick={() => handleDelete(item.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </main>
  )
}

export default page;