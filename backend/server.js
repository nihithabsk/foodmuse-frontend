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
    dietaryPreferences: Object,
    fitnessGoal: String
});

const User = mongoose.model('User', UserSchema);


// Registration Route
app.post('/reg', async (req, res) => {
    try {
        const newUser = new User(req.body);
        console.log(newUser);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});


const PORT = 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));