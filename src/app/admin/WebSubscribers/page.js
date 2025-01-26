"use client"
import { Trash2 } from 'lucide-react'
import { useAppContext } from '../../context/Context'
import React from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../utils/firebaseConfig'

const page = () => {
    const { subscribers, setSubscribers } = useAppContext();

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "Newsletter", id));
        const updatedSubscribers = subscribers.filter((item) => item.id !== id);
        setSubscribers(updatedSubscribers);
    }


  return (
    <div className="w-full bg-white rounded-xl border p-3">
        {subscribers.map((subscriber) => (
          <div
            key={subscriber.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition"
          >
            <span className="text-lg text-gray-700">
              {subscriber.email}
            </span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(subscriber.id)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
  )
}

export default page