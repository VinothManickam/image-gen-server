const express = require('express');
const { generateImage } = require('../services/stableHorde');
const { validatePrompt } = require('../middleware/validate');

const router = express.Router();

router.post('/', validatePrompt, async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await generateImage(prompt);
    if (result.success) {
      res.json({ imageUrl: result.imageUrl });
    } else {
      res.status(429).json({
        message: 'Image generation in progress or rate-limited',
        queue_position: result.queue_position,
        retryAfter: result.retryAfter || 60,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
