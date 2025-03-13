import { motion } from "framer-motion";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import FoodMuseHome from "./FoodMuseHome";

function Register({ onNext, onLogin }: { onNext: (userId: string) => void; onLogin: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5555/reg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        // Pass the user ID to the next component
        onNext(data.userId || '');
      } else {
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
      
      <div className="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl" />
     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 to-black/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full p-8 bg-white/10 backdrop-blur-lg rounded-xl relative z-10 m-4"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">Join FOODMUSE</h2>
          <p className="mt-2 text-center text-sm text-emerald-200">Begin your culinary adventure with us</p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-emerald-200">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80 text-gray-900"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-emerald-200">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80 text-gray-900"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-emerald-200">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80 text-gray-900"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-emerald-200">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80 text-gray-900"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-emerald-200">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80 text-gray-900"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={onLogin}
              className="text-sm text-emerald-200 hover:text-emerald-100"
            >
              Already have an account? Sign in
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Join FOODMUSE
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}


function HealthProfile({ onNext, onBack, userId }: { onNext: () => void; onBack: () => void; userId: string }) {
  const [formData, setFormData] = useState({
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
      paleo: false
    },
    fitnessGoal: 'maintain'
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        [name]: checked
      }
    }));
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      fitnessGoal: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting health profile with userId:", userId);
    console.log("Form data being sent:", formData);
    
    try {
      const response = await fetch(`http://localhost:5555/user/${userId}/health`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      console.log("Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Success response:", data);
        onNext(); 
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Health profile update failed:', errorData);
        alert('Failed to update health profile. Please try again.');
      }
    } catch (error) {
      console.error('Health profile update error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  const dietaryOptions: Record<string, string> = {
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
    
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 to-black/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full space-y-6 p-8 bg-white/10 backdrop-blur-lg rounded-xl relative z-10 m-4"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">Your Health Profile</h2>
          <p className="mt-2 text-center text-sm text-emerald-200">Help us personalize your recommendations</p>
        </div>
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-emerald-100 mb-4">Physical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-emerald-200">Height</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="height"
                    id="height"
                    required
                    min="1"
                    className="flex-1 block w-full px-3 py-2 rounded-l-md border border-gray-300 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80"
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
                <label htmlFor="weight" className="block text-sm font-medium text-emerald-200">Weight</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    required
                    min="1"
                    className="flex-1 block w-full px-3 py-2 rounded-l-md border border-gray-300 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80"
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

          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-emerald-100 mb-4">Health Conditions</h3>
            <div>
              <label htmlFor="healthConditions" className="block text-sm font-medium text-emerald-200">Any health conditions?</label>
              <textarea
                id="healthConditions"
                name="healthConditions"
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80 text-gray-900"
                placeholder="e.g., Diabetes, Hypertension"
                value={formData.healthConditions}
                onChange={handleInputChange}
              />
            </div>
          </div>

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
                    checked={formData.dietaryPreferences[key as keyof typeof formData.dietaryPreferences]}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={key} className="ml-2 block text-sm text-emerald-200">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

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

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onBack}
              className="flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              onClick={handleSubmit}
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
}


function Login({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 to-black/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8 p-8 bg-white/10 backdrop-blur-lg rounded-xl relative z-10 m-4"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">Welcome back to FOODMUSE</h2>
          <p className="mt-2 text-center text-sm text-emerald-200">Sign in to continue</p>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-emerald-200">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80 text-gray-900"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-emerald-200">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white/80 text-gray-900"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onBack}
              className="flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Sign in
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function Home({ onRegister, onLogin }: { onRegister: () => void; onLogin: () => void }) {
  // Component code remains the same
  return (
    <div className="relative">
      <header className="absolute top-0 left-0 right-0 z-20 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">FOODMUSE</div>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-emerald-800 transition-colors"
              onClick={onLogin}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
              onClick={onRegister}
            >
              Register
            </motion.button>
          </div>
        </div>
      </header>

      <div
        className="h-screen bg-cover bg-center relative"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover the Art of Cooking</h1>
            <p className="text-xl md:text-2xl mb-8">Your journey to culinary excellence starts here</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700"
              onClick={onRegister}
            >
              Explore Now
            </motion.button>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </div>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Healthy Meals',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80'
              },
              {
                title: 'Quick Recipes',
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80'
              },
              {
                title: 'Desserts',
                image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80'
              }
            ].map((category, index) => (
              <motion.div
                whileHover={{ y: -10 }}
                className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
                key={index}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function index() {
  const [currentPage, setCurrentPage] = useState<'home' | 'register' | 'health' | 'login' | 'FoodMuseHome'>('home');
  const [userId, setUserId] = useState<string>('');

  const goToRegister = () => setCurrentPage('register');
  const goToHealth = (id: string) => {
    setUserId(id);
    setCurrentPage('health');
  };
  const goToLogin = () => setCurrentPage('login');
  const goToFMH = () => setCurrentPage('FoodMuseHome');

  const goBackFromHealth = () => setCurrentPage('register');
  const goBackFromLogin = () => setCurrentPage('home');

  if (currentPage === 'home') {
    return <Home onRegister={goToRegister} onLogin={goToLogin} />;
  } else if (currentPage === 'register') {
    return <Register onNext={goToHealth} onLogin={goToLogin} />;
  } else if (currentPage === 'health') {
    return <HealthProfile onNext={goToLogin} onBack={goBackFromHealth} userId={userId} />;
  } else if (currentPage === 'login') {
    return <Login onNext={goToFMH} onBack={goBackFromLogin} />;
  } else if(currentPage === 'FoodMuseHome'){
    return <FoodMuseHome />;
  }
  return null;
}
