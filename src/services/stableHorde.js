const axios = require('axios');

const generateImage = async (prompt, ws) => {
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
  const maxAttempts = 60;
  while (attempts < maxAttempts) {
    const statusResponse = await axios.get(
      `https://stablehorde.net/api/v2/generate/status/${id}`,
      { headers: { apikey: apiKey } }
    );

    const status = statusResponse.data;
    ws.send(JSON.stringify({
      status: 'progress',
      queue_position: status.queue_position,
      wait_time: status.wait_time,
    }));

    if (status.done) {
      if (status.faulted) {
        ws.send(JSON.stringify({ status: 'error', message: 'Image generation failed' }));
        return { success: false, error: 'Image generation failed' };
      }
      const imageUrl = status.generations[0]?.url;
      ws.send(JSON.stringify({ status: 'success', imageUrl }));
      return { success: true, imageUrl };
    }

    await new Promise((resolve) => setTimeout(resolve, 10000));
    attempts++;
  }

  ws.send(JSON.stringify({ status: 'error', message: 'Image generation timed out' }));
  return { success: false, error: 'Image generation timed out' };
};

module.exports = { generateImage };
