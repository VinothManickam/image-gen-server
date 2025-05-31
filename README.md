
---

## 📄 `image-gen-server/README.md`

````markdown
# AI Image Generator Server

This is the backend for the AI Image Generator application. It uses **Express.js** to handle API requests and generates AI-powered images using **OpenAI's DALL·E API**. The server also includes caching, rate limiting, CORS configuration, and is deployed on Render.

---

## 🚀 Features

- 🖼️ Generate AI images using OpenAI DALL·E
- 🛡️ Rate limiting with `express-rate-limit`
- 🔐 Security headers via `helmet`
- 🌍 CORS enabled for local and deployed frontend
- 🧠 In-memory caching with `node-cache` (1 hour)

---

## 🛠️ Installation (Local)

### Prerequisites

- Node.js v20 or higher
- OpenAI API key (get it from [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys))

### 1. Clone the Repository

```bash
git clone git@github.com:VinothManickam/ai-image-generator-server.git
cd ai-image-generator-server
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
OPENAI_API_KEY=<your-openai-api-key>
```

Replace `<your-openai-api-key>` with your actual OpenAI API key.

---

## ▶️ Run the Server

```bash
npm start
```

The server will start on: [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoint

### POST `/api/generate`

Generates an image from the given text prompt.

**Request Body:**

```json
{
  "prompt": "a futuristic city at night"
}
```

**Response:**

```json
{
  "imageUrl": "https://openai-image-url.com/..."
}
```

---

## 🧪 Testing

### Manual Test with `curl`

```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "sunset over the mountains"}'
```

> Note: Add automated tests using Jest or Supertest as needed.

---

## 🌐 Deployment

### Render Configuration

* **URL**: [https://image-gen-server-gpwb.onrender.com](https://image-gen-server-gpwb.onrender.com)
* **Environment Variables:**

```env
PORT=5000
OPENAI_API_KEY=<your-openai-api-key>
```

* **Build Command:**

```bash
npm install
```

* **Start Command:**

```bash
npm start
```

---

## 🔒 CORS Configuration

Allows requests from:

* `http://localhost:3000`
* `https://image-gen-client.onrender.com`

Configured using:

```js
cors({
  origin: [
    "http://localhost:3000",
    "https://image-gen-client.onrender.com"
  ]
})
```

---

## 🧠 Caching

* **Library**: `node-cache`
* **TTL**: 1 hour
* Reduces redundant calls to OpenAI for the same prompt.

---

## 📁 Project Structure

```
ai-image-generator-server/
├── index.js            # Main Express server
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
├── cache.js            # Node-cache configuration
└── utils/openai.js     # OpenAI API integration
```

---

## 📦 Dependencies

* express
* axios
* dotenv
* cors
* helmet
* node-cache
* express-rate-limit
* openai

---

## 🙋‍♂️ Author

**Vinoth Manickam**

* GitHub: [@VinothManickam](https://github.com/VinothManickam)
* Deployed App: [https://image-gen-client.onrender.com](https://image-gen-client.onrender.com)

---

## 📌 Notes

* This backend is designed to work with the Next.js frontend: [`image-gen-client`](https://github.com/VinothManickam/image-gen-client.git)
* Make sure both frontend and backend are using consistent CORS and API URLs.

```

---


