const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // if needed

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    console.log("📥 Question:", question);
    const apiKey = process.env.OPENROUTER_API_KEY;
    console.log("🔑 OpenRouter Key Loaded:", !!apiKey);

    if (!question || !apiKey) {
      return res.status(400).json({ error: "Missing question or API key." });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://youreventeve.com", // replace with your real domain
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.warn("⚠️ Unexpected OpenRouter response:", data);
      return res.json({
        answer: "🤖 Sorry, I didn’t get that. Try again?",
      });
    }

    const answer = data.choices[0].message.content;
    return res.json({ answer });
  } catch (error) {
    console.error("❌ OpenRouter AI Error:", error);
    return res.status(500).json({ error: "Something went wrong with AI response." });
  }
});

module.exports = router;
