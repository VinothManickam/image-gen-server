const express = require('express');
const { generateImage } = require('../services/stableHorde');
const { validatePrompt } = require('../middleware/validate');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour
const router = express.Router();

router.post('/', validatePrompt, async (req, res) => {
  const { prompt } = req.body;
  const cacheKey = `image:${prompt}`;

  // Check cache
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    return res.json({ imageUrl: cachedResult });
  }

  try {
    const result = await generateImage(prompt);
    if (result.success) {
      cache.set(cacheKey, result.imageUrl); // Cache the result
      res.json({ imageUrl: result.imageUrl });
    } else {
      res.status(500).json({ message: result.error || 'Failed to generate image' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
