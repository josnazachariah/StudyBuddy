import express from "express";
import fetch from "node-fetch"; // optional in Node 18+
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const APP_ID = "967KKQQXQL"; // replace with your WolframAlpha App ID

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API endpoint
app.post("/api/calculate", async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "No query provided" });

  try {
    const apiUrl = `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(query)}&appid=${APP_ID}&output=json`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from WolframAlpha" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
