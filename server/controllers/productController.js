const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    manufacturer: req.body.manufacturer,
    year: req.body.year,
    src: req.body.src,
    avaibility: req.body.avaibility
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.manufacturer = req.body.manufacturer || product.manufacturer;
    product.year = req.body.year || product.year;
    product.src = req.body.src || product.src;
    product.avaibility = req.body.avaibility || product.avaibility;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Search products by query
exports.searchProducts = async (req, res) => {
  const query = req.query.query;
  try {
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Tokenize and trim the query
    const queryWords = query.split(' ').map(word => word.trim()).filter(word => word !== '');

    // Create a regex pattern for each word to match in title or description
    const regexPatterns = queryWords.map(word => new RegExp(word, 'i'));

    // Build the search criteria
    const searchCriteria = {
      $or: [
        {
          $or: regexPatterns.map(regex => ({ title: { $regex: regex } }))
        },
        {
          $or: regexPatterns.map(regex => ({ description: { $regex: regex } }))
        }
      ]
    };

    // Log the search criteria for debugging
    console.log('Search Criteria:', JSON.stringify(searchCriteria, null, 2));

    const products = await Product.find(searchCriteria);
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error); // Log the error
    res.status(500).json({ message: error.message });
  }
};




