const axios = require('axios');

const generateImage = async (prompt) => {
  const apiKey = process.env.STABLE_HORDE_API_KEY;

  // Submit the generation request
  const submitResponse = await axios.post(
    'https://stablehorde.net/api/v2/generate/async',
    { prompt },
    { headers: { 'Content-Type': 'application/json', apikey: apiKey } }
  );

  const { id } = submitResponse.data;

  // Poll the status
  let attempts = 0;
  const maxAttempts = 60; // Poll for up to 10 minutes (60 * 10 seconds)
  while (attempts < maxAttempts) {
    const statusResponse = await axios.get(
      `https://stablehorde.net/api/v2/generate/status/${id}`,
      { headers: { apikey: apiKey } }
    );

    const status = statusResponse.data;
    if (status.done) {
      if (status.faulted) {
        return { success: false, error: 'Image generation failed' };
      }
      return { success: true, imageUrl: status.generations[0]?.url }; // Adjust based on actual response
    }

    // Wait before polling again
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds
    attempts++;
  }

  return { success: false, error: 'Image generation timed out' };
};

module.exports = { generateImage };
