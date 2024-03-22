const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('open', () => console.log('Connected to MongoDB'));
db.on('error', err => console.error('MongoDB connection error:', err));

// Define MongoDB schema
const FormDataSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPhone: String,
  companyName: String,
  companyWebsite: String,
  industryType: String,
  location: String,
  electricity: Number,
  naturalGas: Number,
  dieselPetrol: Number,
  heatingOil: Number,
  solidWaste: Number,
  liquidWaste: Number,
  hazardousWaste: Number,
  vehicleFuelType: String,
  mileagePerVehicle: Number,
  numVehicles: Number,
  totalMilesDriven: Number,
  airMiles: Number,
  railMiles: Number,
  shipmentMethod: String,
  avgShipmentWeight: Number,
  avgShipmentDistance: Number,
  carbonFootprint: Number
});

// Create MongoDB model
const FormData = mongoose.model('FormData', FormDataSchema);

// Define API endpoint to save form data
app.post('/api/saveFormData', async (req, res) => {
  try {
    const formData = new FormData(req.body);
    const savedFormData = await formData.save();
    res.status(201).json(savedFormData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
