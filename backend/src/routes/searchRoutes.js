const express = require('express');
const router = express.Router();
const { 
  searchProductByText, 
  searchProductByImage, 
  searchProductByLink 
} = require('../controllers/searchController');

// POST /api/search/text
router.post('/text', searchProductByText);

// POST /api/search/image
router.post('/image', searchProductByImage);

// POST /api/search/link
router.post('/link', searchProductByLink);

module.exports = router;
