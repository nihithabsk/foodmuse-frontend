import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock } from 'lucide-react';

const QuickRecipes = () => {
  const [recipes, setRecipes] = useState<string[]>([]);
  const [newRecipe, setNewRecipe] = useState('');

  const handleAddRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRecipe.trim()) {
      setRecipes([...recipes, newRecipe.trim()]);
      setNewRecipe('');
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
            <Clock className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Quick Recipes</h1>
          </div>
          
          <div className="mb-8">
            <form onSubmit={handleAddRecipe} className="flex gap-4">
              <input
                type="text"
                value={newRecipe}
                onChange={(e) => setNewRecipe(e.target.value)}
                placeholder="Enter a quick recipe (e.g., 15-min Pasta)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <Plus className="w-5 h-5" />
                Add Recipe
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Quick Recipes</h2>
            {recipes.length === 0 ? (
              <p className="text-gray-500 italic">No quick recipes added yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-orange-50 rounded-lg border border-orange-200"
                  >
                    <p className="text-orange-800">{recipe}</p>
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

export default QuickRecipes;