const axios = require('axios');

async function generateImage(prompt) {
  const apiKey = process.env.STABLE_HORDE_API_KEY;
  try {
    const response = await axios.post(
      'https://stablehorde.net/api/v2/generate/async',
      {
        prompt,
        params: { n: 1, width: 512, height: 512 },
      },
      { headers: { apikey: apiKey } },
    );

    const { id, queue_position } = response.data;

    for (let i = 0; i < 30; i++) {
      const status = await axios.get(
        `https://stablehorde.net/api/v2/generate/status/${id}`,
        { headers: { apikey: apiKey } },
      );
      if (status.data.done && status.data.generations?.[0]?.img) {
        return { success: true, imageUrl: status.data.generations[0].img };
      }
      if (status.data.queue_position) {
        return { success: false, queue_position: status.data.queue_position };
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return { success: false, queue_position };
  } catch (error) {
    throw new Error('Stable Horde API error');
  }
}

module.exports = { generateImage };
