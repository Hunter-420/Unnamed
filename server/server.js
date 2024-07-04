const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS with specific configuration
app.use(express.json());
app.use(cors());
app.options('*', cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
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
