const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('./middleware/rateLimit');
const generateRouter = require('./routes/generate');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: 'https://image-gen-client.onrender.com' }));
app.use(express.json());
app.use(rateLimit);

app.use('/api/generate', generateRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
