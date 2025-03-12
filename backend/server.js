const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//const connectDB = require("./config/db");
require("dotenv").config();

// Connect Database
// connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
  });

app.get('/', (req, res) =>{
    res.send("Hello..");
});

mongoose.connect('mongodb://localhost:27017/foodmuse', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));


// Define User Schema
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    height: String,
    heightUnit: String,
    weight: String,
    weightUnit: String,
    healthConditions: String,
    dietaryPreferences: {
        vegetarian: Boolean,
        vegan: Boolean,
        glutenFree: Boolean,
        dairyFree: Boolean,
        nutFree: Boolean,
        lowCarb: Boolean,
        keto: Boolean,
        paleo: Boolean
    },
    fitnessGoal: String
});


const User = mongoose.model('User', UserSchema);






// Registration Route - Modified to return the user ID
app.post('/reg', async (req, res) => {
    try {
        const newUser = new User(req.body);
        console.log(newUser);
        const savedUser = await newUser.save();
        res.status(201).json({ 
            message: 'User registered successfully',
            userId: savedUser._id 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Add route to update health details
app.put('/user/:userId/health', async (req, res) => {
    try {
        const userId = req.params.userId;

        const healthData = {
            height: req.body.height,
            heightUnit: req.body.heightUnit,
            weight: req.body.weight,
            weightUnit: req.body.weightUnit,
            healthConditions: req.body.healthConditions,
            dietaryPreferences: req.body.dietaryPreferences,
            fitnessGoal: req.body.fitnessGoal
        };
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: healthData }, 
            { new: true, runValidators: true }  
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ 
            message: 'Health details updated successfully',
            user: updatedUser 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating health details', 
            error: error.message 
        });
    }
});

// Add validation middleware
const validateHealthData = (req, res, next) => {
    const { height, weight, heightUnit, weightUnit, fitnessGoal } = req.body;
    
    if (!height || !weight || !heightUnit || !weightUnit || !fitnessGoal) {
      return res.status(400).json({ message: 'Missing required health fields' });
    }
    
    // Validate height and weight are numbers
    if (isNaN(parseFloat(height)) || isNaN(parseFloat(weight))) {
      return res.status(400).json({ message: 'Height and weight must be numbers' });
    }
    
    next();
  };
  
  
  app.put('/user/:id/health', validateHealthData, async (req, res) => {
    try {
      // ... rest of your code stays the same
    } catch (error) {
      console.error('Health update error:', error);
      res.status(500).json({ 
        message: 'Error updating health details', 
        error: error.message 
      });
    }
  });
  
  // Add login route that returns user data including health details
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // In production, you would compare hashed passwords
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Don't send password to client
      const userResponse = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // Include health data if it exists
        health: {
          height: user.height,
          heightUnit: user.heightUnit,
          weight: user.weight,
          weightUnit: user.weightUnit,
          healthConditions: user.healthConditions,
          dietaryPreferences: user.dietaryPreferences,
          fitnessGoal: user.fitnessGoal
        }
      };
      
      res.status(200).json({ 
        message: 'Login successful',
        user: userResponse
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
const PORT = 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));