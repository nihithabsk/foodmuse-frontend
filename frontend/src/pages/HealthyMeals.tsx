import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Salad } from 'lucide-react';

const HealthyMeals = () => {
  const [meals, setMeals] = useState<string[]>([]);
  const [newMeal, setNewMeal] = useState('');

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMeal.trim()) {
      setMeals([...meals, newMeal.trim()]);
      setNewMeal('');
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
            <Salad className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">Healthy Meals</h1>
          </div>
          
          <div className="mb-8">
            <form onSubmit={handleAddMeal} className="flex gap-4">
              <input
                type="text"
                value={newMeal}
                onChange={(e) => setNewMeal(e.target.value)}
                placeholder="Enter a healthy meal (e.g., Quinoa Buddha Bowl)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <Plus className="w-5 h-5" />
                Add Meal
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Healthy Meals</h2>
            {meals.length === 0 ? (
              <p className="text-gray-500 italic">No healthy meals added yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {meals.map((meal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"
                  >
                    <p className="text-emerald-800">{meal}</p>
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

export default HealthyMeals;