import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for translation
  app.post("/api/translate", async (req, res) => {
    const { text } = req.body;
    try {
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text prompt is required" });
      }

      const anthropicKey = process.env.ANTHROPIC_API_KEY;
      if (anthropicKey && anthropicKey.trim() !== "") {
        try {
          const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "x-api-key": anthropicKey,
              "anthropic-version": "2023-06-01",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 100,
              system: "You are an emoji translator. Convert any text into a short expressive sequence of 3-6 emojis that captures the emotion and vibe. Reply with ONLY the emojis, nothing else.",
              messages: [
                { role: "user", content: text }
              ]
            })
          });

          if (anthropicResponse.ok) {
            const data = await anthropicResponse.json();
            const emojiResult = data?.content?.[0]?.text?.trim();
            if (emojiResult) {
              return res.json({ emojis: emojiResult });
            }
          }
        } catch (err) {
          console.error("Anthropic call failed. Gracefully falling back to Gemini.", err);
        }
      }

      // Fallback: Gemini API
      const geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        throw new Error("No API key configured. Provide GEMINI_API_KEY.");
      }

      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: text,
        config: {
          systemInstruction: "You are an emoji translator. Convert any text into a short expressive sequence of 3-6 emojis that captures the emotion and vibe. Reply with ONLY the emojis, nothing else."
        }
      });

      const emojiResult = response.text?.trim() || "✨📱💬";
      return res.json({ emojis: emojiResult });

    } catch (error: any) {
      console.warn("Server-side translation failed or quota exceeded. Running smart local fallback:", error);
      const textVal = (text || "").toLowerCase();
      let fallbackEmojis = "✨📱💬";
      if (textVal.includes("love") || textVal.includes("like")) fallbackEmojis = "💖🥰🫶❤️";
      else if (textVal.includes("sad") || textVal.includes("cry")) fallbackEmojis = "😭🌧️💔🥺";
      else if (textVal.includes("angry") || textVal.includes("hate")) fallbackEmojis = "😡😤🤬👿";
      else if (textVal.includes("fire") || textVal.includes("hype") || textVal.includes("lit")) fallbackEmojis = "🔥⚡🏆💪";
      else if (textVal.includes("crazy") || textVal.includes("party")) fallbackEmojis = "🤯🥳🎉🍻";
      else {
        const randoms = ["✨", "🌈", "🔥", "🔮", "🫠", "👑", "💖", "⚡", "🌟"];
        fallbackEmojis = [...randoms].sort(() => 0.5 - Math.random()).slice(0, 4).join("");
      }
      return res.json({ emojis: fallbackEmojis, source: "graceful_fallback" });
    }
  });

  // API Route for message natural emoji enhancement/re-writing
  app.post("/api/enhance", async (req, res) => {
    const { text, mood } = req.body;
    try {
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      const geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        throw new Error("No API key configured");
      }

      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      const systemInstruction = `You are an expressive messaging assistant built into a keyboard called Emora.

Whenever the user types any message in normal text, you must automatically rewrite it with emojis woven naturally into the text — not just at the end, but placed at the most emotionally fitting points: middle of a sentence, after a key word, at the end, or split across the message wherever it feels most natural and human.

Rules:
1. Never remove the user's original words. Keep the full message intact, just enhanced.
2. Read the emotional tone of the message first — detect if it is: happy, sad, hyped, romantic, chaotic, anxious, tired, sarcastic, excited, angry, soft, or neutral.
3. Place emojis at the point in the sentence where the emotion peaks — not randomly, not always at the end.
4. Match the emoji to the specific word or phrase it amplifies, not just the general vibe of the whole message.
5. Use 2 to 5 emojis per message depending on length. Short messages get 1–2. Long messages get 3–5. Never over-emoji.
6. Never explain what you did. Never add commentary. Output only the enhanced message.
7. If the message is already expressive or has emojis, enhance lightly — do not double up.
8. Keep the tone matching the user's energy — if they're casual, stay casual. If they're serious, be subtle with emojis.

Mood-to-emoji mapping guide:
- Happy / excited → ✨ 🔥 🎉 😭 🥹
- Sad / down → 💔 🌧️ 🥺 😞 🫂
- Romantic / soft → ❤️ 🌹 💕 🥰 💫
- Hyped / chaotic → 🚨 💀 🔥 ⚡ 😤
- Tired / drained → 💀 😮‍💨 🧊 😶 🫠
- Sarcastic / dry → 💀 😐 👁️ 🙃 ☠️
- Anxious / nervous → 😭 🙏 💀 😰 🫣
- Grateful / wholesome → 🫶 🥹 ✨ 💛 🙏
- Angry / frustrated → 😤 🔥 💢 😒 👊
- Neutral / chill → 👀 💅 🤷 😌 ✌️`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: text,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const enhancedText = response.text?.trim() || text;
      return res.json({ enhanced: enhancedText, source: "gemini_api" });

    } catch (error: any) {
      console.warn("Server-side Gemini enhance request failed. Activating local express rules:", error);
      
      // Fallback: smart manual local regex placement
      let enhanced = text;
      const lower = text.toLowerCase();
      
      // Weave emojis gracefully into matching peaks of the sentence
      if (lower.includes("meeting") || lower.includes("work") || lower.includes("long")) {
        enhanced = text.replace(/meeting|work|long/i, (match) => `${match} 💀`) + " 🫨";
      } else if (lower.includes("miss") || lower.includes("love") || lower.includes("heart")) {
        enhanced = text.replace(/miss|love|heart/i, (match) => `${match} ❤️`) + " 🥺";
      } else if (lower.includes("excit") || lower.includes("yay") || lower.includes("cool")) {
        enhanced = text.replace(/excited|excit|yay|cool/i, (match) => `${match} ✨`) + " 🔥";
      } else if (lower.includes("fine") || lower.includes("okay") || lower.includes("ok")) {
        enhanced = text.replace(/fine|okay|ok/i, (match) => `${match} 😶`) + " 😌";
      } else if (lower.includes("sad") || lower.includes("cry") || lower.includes("sorry")) {
        enhanced = text.replace(/sad|cry|sorry/i, (match) => `${match} 😭`) + " 🫂";
      } else if (lower.includes("hate") || lower.includes("angry") || lower.includes("mad")) {
        enhanced = text.replace(/hate|angry|mad/i, (match) => `${match} 😤`) + " 💢";
      } else {
        // Default generic enhancement
        enhanced = `${text} ✨`;
      }
      
      return res.json({ enhanced, source: "graceful_fallback" });
    }
  });

  // API Route for dynamic vibe-mapping emoji suggestions
  app.post("/api/suggest", async (req, res) => {
    const { text, mood } = req.body;
    try {
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      // Pre-check keywords locally to avoid unnecessary API usage entirely
      const lower = text.toLowerCase().trim();
      const localMap: Record<string, string> = {
        miss: "🥺😭💔🫂",
        love: "🥰❤️🫶💖",
        insane: "🤪🌀🧠💥",
        crazy: "🤯👽👹💥",
        tired: "🥱😴💤🔋",
        excited: "🤩🎉🥳🚀",
        sad: "😭💔🥶🌧️",
        happy: "😊✨☀️🙌",
        bored: "😐🙄🥱🌫️",
        angry: "😡😤🤬👿",
        fire: "🔥👑💯🏆",
        cooked: "💀🍳🫠❌",
        done: "🛑💆‍♂️🥱🏳️",
        wtf: "🤨👀❓🫨",
        cute: "🥺🐱🐾🌸",
        vibes: "✨🌙💅👀",
        winning: "🏆💯💪✅",
        cold: "🥶❄️🧊🌬️",
        hot: "🥵🔥🌶️☀️"
      };

      for (const [key, value] of Object.entries(localMap)) {
        if (lower.includes(key)) {
          return res.json({ suggestions: value, source: "local_keywords" });
        }
      }

      const geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        throw new Error("No API key configured");
      }

      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Given the typed message "${text}", suggest a sequence of exactly 4 emojis that captures its tone, mood, and content. Reply with ONLY the 4 emojis and nothing else!`,
        config: {
          systemInstruction: "You are an emoji assistant. Answer with exactly 4 emojis and no other text."
        }
      });

      const suggestions = response.text?.trim() || "";
      if (suggestions && suggestions.length > 0) {
        return res.json({ suggestions, source: "gemini_api" });
      } else {
        throw new Error("Empty response from model");
      }
    } catch (error: any) {
      console.warn("Server-side Gemini suggest call failed or quota limits hit. Running local fallback:", error);
      
      const moodSets: Record<string, string[]> = {
        vibe: ["😂", "💀", "🔥", "✨", "❤️", "🌙", "🫶", "💅", "👀", "😭", "🤩", "🫠"],
        chaos: ["🔥", "💀", "🚨", "⚡", "😈", "👹", "🌀", "💥", "🎭", "🤡", "😤", "🗡️"],
        romantic: ["❤️", "🌹", "✨", "💕", "🥰", "💖", "🌸", "💌", "🫦", "💞", "🌷", "💫"],
        sad: ["😭", "🌧️", "🧊", "💔", "🫂", "😢", "🖤", "🌫️", "💀", "😶", "🌊", "🥺"],
        hype: ["🔥", "⚡", "🏆", "💪", "🎉", "🚀", "👑", "💯", "🎯", "🥳", "🙌", "✅"]
      };

      const set = moodSets[mood as string] || moodSets.vibe;
      const shuffled = [...set].sort(() => 0.5 - Math.random());
      const fallbackResult = shuffled.slice(0, 4).join("");

      return res.json({ suggestions: fallbackResult, source: "graceful_fallback" });
    }
  });

  // Serve static assets in production, otherwise delegate to Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
