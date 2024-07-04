const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: 'https://unnamed-two.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.send('Server is healthy');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
