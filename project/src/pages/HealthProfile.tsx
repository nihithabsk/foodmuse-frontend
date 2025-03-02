import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';

// Define types for form data
interface DietaryPreferences {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  nutFree: boolean;
  lowCarb: boolean;
  keto: boolean;
  paleo: boolean;
  [key: string]: boolean; // Index signature for dynamic access
}

interface FormData {
  height: string;
  heightUnit: string;
  weight: string;
  weightUnit: string;
  healthConditions: string;
  dietaryPreferences: DietaryPreferences;
  fitnessGoal: string;
}

const HealthProfile = () => {
  // Mock navigate function since we're not using actual react-router
  const navigate = (path: number | string) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use the router to navigate
  };
  
  const [formData, setFormData] = useState<FormData>({
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    healthConditions: '',
    dietaryPreferences: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      lowCarb: false,
      keto: false,
      paleo: false,
    },
    fitnessGoal: 'maintain',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        [name]: checked
      }
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      fitnessGoal: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile submission logic
    console.log('Form submitted:', formData);
    navigate('/dashboard'); // Redirect to dashboard after submission
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Create a typed dictionary for dietary preferences
  const dietaryOptions: Record<keyof DietaryPreferences, string> = {
    vegetarian: 'Vegetarian',
    vegan: 'Vegan',
    glutenFree: 'Gluten-Free',
    dairyFree: 'Dairy-Free',
    nutFree: 'Nut-Free',
    lowCarb: 'Low-Carb',
    keto: 'Keto',
    paleo: 'Paleo'
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Animated background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 to-black/50 backdrop-blur-sm"
      />

      {/* Floating decoration elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 left-20 w-60 h-60 bg-emerald-600/20 rounded-full blur-xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full space-y-6 p-8 bg-white/10 backdrop-blur-lg rounded-xl relative z-10 my-8 mx-4"
      >
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
            Your Health Profile
          </h2>
          <p className="mt-2 text-center text-sm text-emerald-200">
            Help us personalize your nutrition and recipe recommendations
          </p>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* Height and Weight Section */}
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-emerald-100 mb-4">Physical Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-emerald-200">
                  Height
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="height"
                    id="height"
                    required
                    min="1"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80"
                    placeholder="Enter your height"
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                  <select
                    name="heightUnit"
                    id="heightUnit"
                    className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                    value={formData.heightUnit}
                    onChange={handleInputChange}
                  >
                    <option value="cm">cm</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-emerald-200">
                  Weight
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    required
                    min="1"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80"
                    placeholder="Enter your weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                  <select
                    name="weightUnit"
                    id="weightUnit"
                    className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                    value={formData.weightUnit}
                    onChange={handleInputChange}
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Health Conditions Section */}
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-emerald-100 mb-4">Health Conditions</h3>
            <div>
              <label htmlFor="healthConditions" className="block text-sm font-medium text-emerald-200">
                List any health conditions or concerns
              </label>
              <textarea
                id="healthConditions"
                name="healthConditions"
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80 text-gray-900"
                placeholder="e.g., Diabetes, Hypertension, Heart Disease, etc."
                value={formData.healthConditions}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Dietary Preferences Section */}
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-emerald-100 mb-4">Dietary Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(dietaryOptions).map(([key, label]) => (
                <div key={key} className="flex items-center">
                  <input
                    id={key}
                    name={key}
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    checked={formData.dietaryPreferences[key as keyof DietaryPreferences]}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={key} className="ml-2 block text-sm text-emerald-200">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Fitness Goal Section */}
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-emerald-100 mb-4">Fitness Goal</h3>
            <div className="space-y-2">
              {[
                { id: 'lose', label: 'Lose Weight' },
                { id: 'maintain', label: 'Maintain Weight' },
                { id: 'gain', label: 'Gain Weight' },
                { id: 'muscle', label: 'Build Muscle' },
                { id: 'performance', label: 'Improve Athletic Performance' }
              ].map((goal) => (
                <div key={goal.id} className="flex items-center">
                  <input
                    id={goal.id}
                    name="fitnessGoal"
                    type="radio"
                    value={goal.id}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    checked={formData.fitnessGoal === goal.id}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor={goal.id} className="ml-2 block text-sm text-emerald-200">
                    {goal.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoBack}
              className="flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Complete Registration
              <Check className="w-4 h-4 ml-2" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default HealthProfile;