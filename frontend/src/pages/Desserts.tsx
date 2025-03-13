import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Cake } from 'lucide-react';

const Desserts = () => {
  const [desserts, setDesserts] = useState<string[]>([]);
  const [newDessert, setNewDessert] = useState('');

  const handleAddDessert = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDessert.trim()) {
      setDesserts([...desserts, newDessert.trim()]);
      setNewDessert('');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Cake className="h-8 w-8 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900">Desserts</h1>
          </div>
          
          <div className="mb-8">
            <form onSubmit={handleAddDessert} className="flex gap-4">
              <input
                type="text"
                value={newDessert}
                onChange={(e) => setNewDessert(e.target.value)}
                placeholder="Enter a dessert (e.g., Chocolate Lava Cake)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <Plus className="w-5 h-5" />
                Add Dessert
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Desserts</h2>
            {desserts.length === 0 ? (
              <p className="text-gray-500 italic">No desserts added yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {desserts.map((dessert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-pink-50 rounded-lg border border-pink-200"
                  >
                    <p className="text-pink-800">{dessert}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Desserts;