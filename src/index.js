const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('./middleware/rateLimit');
const generateRouter = require('./routes/generate');
const dotenv = require('dotenv');
const WebSocket = require('ws');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: ['https://image-gen-client.onrender.com', 'http://localhost:3000']
}));
app.use(express.json());
app.use(rateLimit);

app.use('/api/generate', generateRouter);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const { prompt } = JSON.parse(message);
    // Handle image generation and send updates via WebSocket
    ws.send(JSON.stringify({ status: 'queued', prompt }));
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
