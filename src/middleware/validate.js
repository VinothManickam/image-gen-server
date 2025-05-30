const { z } = require('zod');

const promptSchema = z
  .string()
  .min(1, 'Prompt is required')
  .max(500, 'Prompt must be 500 characters or less')
  .regex(/^[a-zA-Z0-9\s,.\-']+$/, 'Prompt contains invalid characters');

function validatePrompt(req, res, next) {
  try {
    promptSchema.parse(req.body.prompt);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid prompt', error: error.message });
  }
}

module.exports = { validatePrompt };