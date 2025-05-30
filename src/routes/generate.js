const express = require('express');
const { generateImage } = require('../services/stableHorde');
const { validatePrompt } = require('../middleware/validate');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 3600 });
const router = express.Router();

router.ws('/', (ws, req) => {
  ws.on('message', async (message) => {
    const { prompt } = JSON.parse(message);
    const cacheKey = `image:${prompt}`;

    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      ws.send(JSON.stringify({ status: 'success', imageUrl: cachedResult }));
      return;
    }

    try {
      const result = await generateImage(prompt, ws);
      if (result.success) {
        cache.set(cacheKey, result.imageUrl);
      }
    } catch (error) {
      ws.send(JSON.stringify({ status: 'error', message: error.message }));
    }
  });
});

module.exports = router;
