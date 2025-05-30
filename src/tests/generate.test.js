const request = require('supertest');
const express = require('express');
const generateRouter = require('../routes/generate');

jest.mock('../services/stableHorde');

const app = express();
app.use(express.json());
app.use('/api/generate', generateRouter);

describe('POST /api/generate', () => {
  it('should return 400 for invalid prompt', async () => {
    const res = await request(app).post('/api/generate').send({ prompt: '' });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid prompt');
  });

  it('should return image URL for valid prompt', async () => {
    const mockGenerateImage = require('../services/stableHorde').generateImage;
    mockGenerateImage.mockResolvedValue({ success: true, imageUrl: 'https://stablehorde.net/test.jpg' });
    const res = await request(app).post('/api/generate').send({ prompt: 'test prompt' });
    expect(res.status).toBe(200);
    expect(res.body.imageUrl).toBe('https://stablehorde.net/test.jpg');
  });
});