import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const [vegetables, setVegetables] = useState<string[]>([]);
  const [newVegetable, setNewVegetable] = useState('');

  const handleAddVegetable = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVegetable.trim()) {
      setVegetables([...vegetables, newVegetable.trim()]);
      setNewVegetable('');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Vegetables</h2>
            <form onSubmit={handleAddVegetable} className="flex gap-4">
              <input
                type="text"
                value={newVegetable}
                onChange={(e) => setNewVegetable(e.target.value)}
                placeholder="Enter a vegetable"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <Plus className="w-5 h-5" />
                Add
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Vegetables</h2>
            {vegetables.length === 0 ? (
              <p className="text-gray-500 italic">No vegetables added yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vegetables.map((vegetable, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {vegetable}
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

export default Dashboard;