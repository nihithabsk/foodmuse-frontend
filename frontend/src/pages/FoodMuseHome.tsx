import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Home, Info, Heart, User, Plus, X } from 'lucide-react';

const FoodMuseHome = () => {
  // Fix: Explicitly type the ingredients array as string[]
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  const addIngredient = () => {
    if (inputValue.trim()) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };
  
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };
  
  return (
    <div className="min-h-screen relative bg-gray-100">
      {/* Background - Made lighter for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/20 to-emerald-900/10" />
      
      {/* Navigation bar - Darkened for better contrast with text */}
      <header className="relative z-10 bg-emerald-700 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ChefHat className="w-6 h-6" />
            <span className="text-xl font-bold">Food Muse</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-1 hover:text-emerald-200">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-emerald-200">
              <Info className="w-5 h-5" />
              <span>About</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-emerald-200">
              <Heart className="w-5 h-5" />
              <span>Saved Recipes</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-emerald-200">
              <User className="w-5 h-5" />
              <span>username</span>
            </a>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative z-10 pt-8 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          {/* Changed text color from white to a darker color for better visibility */}
          <h1 className="text-5xl font-bold text-emerald-900 mb-4">Welcome to Food Muse!</h1>
          <p className="text-xl text-emerald-800">Enter your ingredients and let's create something delicious</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mb-8"
        >
          {/* Changed text color from white to a darker color */}
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">What's in your kitchen?</h2>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter an ingredient..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              onClick={addIngredient}
            >
              <Plus className="w-5 h-5 mr-1" />
              Add
            </motion.button>
          </div>
          
          {ingredients.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm border border-emerald-300 flex items-center">
                  <span>{ingredient}</span>
                  <button 
                    onClick={() => removeIngredient(index)}
                    className="ml-2 text-emerald-600 hover:text-emerald-800 focus:outline-none"
                    aria-label={`Remove ${ingredient}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-medium"
            >
              Generate Recipes
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8"
        >
          {/* Changed text color from white to a darker color */}
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">Filter Recipes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">Choose your preferred cooking duration:</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900">
                <option>Select Duration</option>
                <option>Under 15 minutes</option>
                <option>15-30 minutes</option>
                <option>30-60 minutes</option>
                <option>Over 60 minutes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">Select Cuisine:</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900">
                <option>Select Cuisine</option>
                <option>Italian</option>
                <option>Chinese</option>
                <option>Mexican</option>
                <option>Indian</option>
                <option>Japanese</option>
                <option>Thai</option>
                <option>French</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-emerald-700 mb-3">Select Dish Types:</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'main course', 'side dish', 'dessert', 'appetizer', 
                'salad', 'bread', 'breakfast', 'soup', 
                'beverage', 'sauce', 'marinade', 'fingerfood', 
                'snack', 'drink'
              ].map((type) => (
                <div key={type} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={type} 
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor={type} className="ml-2 block text-sm text-emerald-700">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-medium"
            >
              Apply Filters
            </motion.button>
            <button className="text-emerald-600 px-6 py-2 hover:text-emerald-800">
              Reset Filter
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default FoodMuseHome;