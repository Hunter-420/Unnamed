const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
//import path from 'path';
//import fs from 'fs';
const Product = require('./models/Product');



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS with specific configuration
app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use(require('prerender-node').set('prerenderToken', 'GrvbuT2WCoSbboCxuvTJ'));

// Serve static files
// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/product/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     const filePath = path.join(__dirname, '../client/build', 'index.html');

//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading file:', err);
//         return res.status(500).send('Error reading file');
//       }

//       console.log('Raw HTML:', data);

//       let updatedHtml = data
//         .replace(/__TITLE__/g, product.title || "Customer Home")
//         .replace(/__DESCRIPTION__/g, product.description || "Product Description")
//         .replace(/__IMAGE__/g, product.src || "https://via.placeholder.com/150")
//         .replace(/__URL__/g, req.protocol + '://' + req.get('host') + req.originalUrl);

  


//       console.log('Updated HTML:', updatedHtml);

//       res.send(updatedHtml);
//     });
//   } catch (err) {
//     console.error('Error retrieving product:', err);
//     res.status(500).json({ message: err.message });
//   }
// });






// app.use(express.static(path.join(__dirname, '../client/build')));




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
