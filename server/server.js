const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS with specific configuration
const corsOptions = {
  origin: 'https://unnamed-two.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight requests

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Optional if using latest Mongoose versions
  useUnifiedTopology: true // Optional if using latest Mongoose versions
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Import and use routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes); // Authentication routes

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes); // Product routes

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
