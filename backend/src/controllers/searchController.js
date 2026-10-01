const { pool } = require('../config/db');

// Generate realistic search results mapping to Amazon, Flipkart, and Meesho
const fetchFromECommerce = async (query) => {
  try {
    const platforms = [
      { name: 'Amazon', baseUrl: 'https://www.amazon.in/s?k=' },
      { name: 'Flipkart', baseUrl: 'https://www.flipkart.com/search?q=' },
      { name: 'Meesho', baseUrl: 'https://www.meesho.com/search?q=' }
    ];
    
    let results = [];
    const productName = query || 'Best Product';
    
    // Generate 10 results distributed across the 3 platforms
    for (let i = 0; i < 10; i++) {
      const platform = platforms[i % 3]; // Round robin
      
      // Generate realistic price variation
      const basePrice = 500 + Math.floor(Math.random() * 4000); // 500 to 4500
      const price = +(basePrice + (Math.random() * 99)).toFixed(2);
      
      // Generate realistic rating (3.0 to 5.0)
      const rating = +(3.0 + Math.random() * 2.0).toFixed(1);
      
      // Generate realistic review counts
      const reviewsCount = Math.floor(Math.random() * 15000) + 100;

      // Unique title variations
      const prefixes = ['Premium', 'Original', 'Best Selling', 'Latest', 'Top Rated'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      
      results.push({
        id: `prod_${i}_${Date.now()}`,
        title: `${prefix} ${productName} - Excellent Quality`,
        platform: platform.name,
        price: price,
        rating: rating,
        reviewsCount: reviewsCount,
        url: `${platform.baseUrl}${encodeURIComponent(productName)}`,
        imageUrl: `https://via.placeholder.com/300x300?text=${encodeURIComponent(platform.name)}+Item`
      });
    }

    // Algorithm: Sort by rating/price ratio (Value)
    results.sort((a, b) => {
      const scoreA = a.rating / a.price;
      const scoreB = b.rating / b.price;
      return scoreB - scoreA;
    });

    return results;
  } catch (error) {
    console.error("Search Generation Error:", error);
    return [];
  }
};

// Route: POST /api/search/text
const searchProductByText = async (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Fetch and rank products
    const topProducts = await fetchFromECommerce(query);
    
    // If the user is authenticated (we would extract this from JWT middleware later), 
    // we could save their search history to the DB here.
    
    res.json({
      success: true,
      query,
      results: topProducts
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Failed to search products' });
  }
};

// Route: POST /api/search/image
const searchProductByImage = async (req, res) => {
  // In a real app, you would use multer to handle the image upload
  // and pass the image buffer to Google Cloud Vision API or AWS Rekognition
  // which would return text labels (e.g., "Nike Shoes", "Coffee Mug").
  
  // For this mock, we assume the frontend sends a base64 string or an image URL
  const { imageData } = req.body;
  
  if (!imageData) {
    return res.status(400).json({ message: 'Image data is required' });
  }

  try {
    // Simulate image recognition taking some time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock recognized keyword
    const recognizedKeyword = "Premium Wireless Headphones"; 
    
    const topProducts = await fetchFromECommerce(recognizedKeyword);

    res.json({
      success: true,
      recognizedKeyword,
      results: topProducts
    });
  } catch (error) {
    console.error('Image search error:', error);
    res.status(500).json({ message: 'Failed to process image' });
  }
};

// Route: POST /api/search/link
const searchProductByLink = async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ message: 'Product URL is required' });
  }

  try {
    // In production, you would fetch the HTML of the URL and extract the meta title/keywords
    // Simulate link parsing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const extractedProduct = "Smart Fitness Watch"; 
    
    const topProducts = await fetchFromECommerce(extractedProduct);

    res.json({
      success: true,
      extractedProduct,
      results: topProducts
    });
  } catch (error) {
    console.error('Link search error:', error);
    res.status(500).json({ message: 'Failed to parse link' });
  }
};

module.exports = {
  searchProductByText,
  searchProductByImage,
  searchProductByLink
};
