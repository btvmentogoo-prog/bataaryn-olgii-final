import express from "express";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Google GenAI initialization
let aiClient: any = null;

function getGenAIClient() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    const { GoogleGenAI } = require("@google/genai");
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- Real-Time Visitor Analytics & Research State ---
interface ActiveSession {
  sessionId: string;
  lastSeen: number;
  country: string;
  device: string;
  currentSection: string;
}

let activeSessions: Map<string, ActiveSession> = new Map();
let totalVisitsCounter = 18450;
let todayVisitsCounter = 386;
let lastResetDate = new Date().toDateString();

// Seeded realistic survey responses
let surveyData = {
  travelIntent: {
    autumn2026: 428,
    spring2027: 312,
    summer2027: 645,
    researching: 219,
  },
  interestFocus: {
    khermenTsav: 580,
    tarbosaurusFossil: 720,
    ecoCampStay: 490,
    stargazing: 380,
    snowLeopard: 410,
  },
  preferredService: {
    guided4x4: 610,
    deluxeGer: 540,
    paleoExpert: 475,
    telescopeAstro: 320,
  },
  totalVotes: 1604,
};

// Periodic cleanup of inactive sessions older than 90 seconds
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of activeSessions.entries()) {
    if (now - session.lastSeen > 90000) {
      activeSessions.delete(id);
    }
  }

  // Daily counter rollover check
  const currentDate = new Date().toDateString();
  if (currentDate !== lastResetDate) {
    lastResetDate = currentDate;
    todayVisitsCounter = 12;
  }
}, 15000);

// Analytics Heartbeat / Register
app.post("/api/analytics/heartbeat", (req, res) => {
  const { sessionId, country = "MN", device = "Desktop", currentSection = "hero" } = req.body;
  const now = Date.now();
  const id = sessionId || `anon-${Math.random().toString(36).substring(2, 9)}`;

  const isNew = !activeSessions.has(id);
  if (isNew) {
    totalVisitsCounter += 1;
    todayVisitsCounter += 1;
  }

  activeSessions.set(id, {
    sessionId: id,
    lastSeen: now,
    country,
    device,
    currentSection,
  });

  // Calculate realistic live count (active in memory + baseline active desert explorers)
  const activeNow = Math.max(activeSessions.size, 18 + Math.floor(Math.sin(now / 300000) * 8 + (now % 7)));

  res.json({
    success: true,
    sessionId: id,
    activeNow,
    totalVisits: totalVisitsCounter,
    todayVisits: todayVisitsCounter,
  });
});

// Analytics Summary Stats & Research Data
app.get("/api/analytics/stats", (req, res) => {
  const now = Date.now();
  const activeNow = Math.max(activeSessions.size, 18 + Math.floor(Math.sin(now / 300000) * 8 + (now % 7)));

  const countryStats = [
    { code: "MN", name: "Монгол (Mongolia)", share: 58, count: Math.round(totalVisitsCounter * 0.58) },
    { code: "US", name: "АНУ (United States)", share: 14, count: Math.round(totalVisitsCounter * 0.14) },
    { code: "JP", name: "Япон (Japan)", share: 11, count: Math.round(totalVisitsCounter * 0.11) },
    { code: "CN", name: "БНХАУ (China)", share: 7, count: Math.round(totalVisitsCounter * 0.07) },
    { code: "DE", name: "Герман (Germany)", share: 4, count: Math.round(totalVisitsCounter * 0.04) },
    { code: "FR", name: "Франц (France)", share: 3, count: Math.round(totalVisitsCounter * 0.03) },
    { code: "OTHER", name: "Бусад улсууд", share: 3, count: Math.round(totalVisitsCounter * 0.03) },
  ];

  const sectionStats = [
    { id: "khermen-tsav", name: "Хэрмэн цав каньон", visits: Math.round(totalVisitsCounter * 0.38) },
    { id: "fossil-lab", name: "Батаарын олдвор & Эрдэм шинжилгээ", visits: Math.round(totalVisitsCounter * 0.32) },
    { id: "visitor-guide", name: "Батаарын өлгий жуулчны бааз", visits: Math.round(totalVisitsCounter * 0.26) },
    { id: "gobi-weather", name: "Цаг агаарын станц", visits: Math.round(totalVisitsCounter * 0.22) },
    { id: "booking", name: "Аяллын захиалга & Үнэ", visits: Math.round(totalVisitsCounter * 0.18) },
    { id: "snow-leopard", name: "Цоохор ирвэс судалгаа", visits: Math.round(totalVisitsCounter * 0.15) },
  ];

  const hourlyTrend = [
    { hour: "00:00", visitors: 14 },
    { hour: "04:00", visitors: 8 },
    { hour: "08:00", visitors: 32 },
    { hour: "12:00", visitors: 64 },
    { hour: "16:00", visitors: 89 },
    { hour: "20:00", visitors: 112 },
    { hour: "Одоо", visitors: activeNow * 4 },
  ];

  res.json({
    activeNow,
    totalVisits: totalVisitsCounter,
    todayVisits: todayVisitsCounter,
    avgSessionMinutes: 4.8,
    countries: countryStats,
    sections: sectionStats,
    hourlyTrend,
    survey: surveyData,
    lastUpdated: new Date().toISOString(),
  });
});

// Submit Visitor Survey Vote
app.post("/api/analytics/survey", (req, res) => {
  const { questionId, optionKey } = req.body;

  if (questionId === "travelIntent" && (surveyData.travelIntent as any)[optionKey] !== undefined) {
    (surveyData.travelIntent as any)[optionKey] += 1;
    surveyData.totalVotes += 1;
  } else if (questionId === "interestFocus" && (surveyData.interestFocus as any)[optionKey] !== undefined) {
    (surveyData.interestFocus as any)[optionKey] += 1;
    surveyData.totalVotes += 1;
  } else if (questionId === "preferredService" && (surveyData.preferredService as any)[optionKey] !== undefined) {
    (surveyData.preferredService as any)[optionKey] += 1;
    surveyData.totalVotes += 1;
  }

  res.json({
    success: true,
    survey: surveyData,
  });
});

// Text to Speech Audio Guide Generation endpoint
app.post("/api/tts", async (req, res) => {
  try {
    const { text, lang = "mn", voice = "Puck" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const ai = getGenAIClient();

    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is not configured",
        fallback: true,
      });
    }

    // Call Gemini 3.1 Flash TTS model
    const prompt = lang === "mn"
      ? `Speak clearly, slowly and naturally in pure Mongolian language as an authoritative paleontological museum audio guide narrator: ${text}`
      : `Speak clearly and naturally as a museum audio tour guide: ${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice || "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      return res.status(500).json({ error: "No audio generated from model", fallback: true });
    }

    return res.json({
      success: true,
      audioData: base64Audio,
      mimeType: "audio/pcm;rate=24000",
      sampleRate: 24000,
    });
  } catch (error: any) {
    console.error("TTS generation error:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate audio",
      fallback: true,
    });
  }
});

// Endpoint to upload and persist the authentic Family Suite video directly to server
app.post("/api/upload-suite-video", express.raw({ type: "*/*", limit: "350mb" }), (req, res) => {
  try {
    const videoBuffer = req.body;
    if (!videoBuffer || !Buffer.isBuffer(videoBuffer) || videoBuffer.length === 0) {
      return res.status(400).json({ error: "No video data received" });
    }
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const publicPath = path.join(publicDir, "family_suite_tour.mp4");
    fs.writeFileSync(publicPath, videoBuffer);

    // Also copy to dist if dist exists
    const distDir = path.join(process.cwd(), "dist");
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, "family_suite_tour.mp4"), videoBuffer);
    }

    console.log(`Successfully saved suite video (${(videoBuffer.length / (1024 * 1024)).toFixed(2)} MB)`);
    return res.json({
      success: true,
      size: videoBuffer.length,
      url: `/family_suite_tour.mp4?t=${Date.now()}`,
    });
  } catch (error: any) {
    console.error("Video upload error:", error);
    return res.status(500).json({ error: error.message || "Failed to save video" });
  }
});

// Endpoint to upload and persist the Expedition Popular video directly to server
app.post("/api/upload-expedition-video", express.raw({ type: "*/*", limit: "350mb" }), (req, res) => {
  try {
    const videoBuffer = req.body;
    if (!videoBuffer || !Buffer.isBuffer(videoBuffer) || videoBuffer.length === 0) {
      return res.status(400).json({ error: "No video data received" });
    }
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const publicPath = path.join(publicDir, "expedition_popular_tour.mp4");
    fs.writeFileSync(publicPath, videoBuffer);

    const distDir = path.join(process.cwd(), "dist");
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, "expedition_popular_tour.mp4"), videoBuffer);
    }

    console.log(`Successfully saved expedition video (${(videoBuffer.length / (1024 * 1024)).toFixed(2)} MB)`);
    return res.json({
      success: true,
      size: videoBuffer.length,
      url: `/expedition_popular_tour.mp4?t=${Date.now()}`,
    });
  } catch (error: any) {
    console.error("Expedition video upload error:", error);
    return res.status(500).json({ error: error.message || "Failed to save video" });
  }
});

// Endpoint to upload authentic camp panorama photo, enhance quality with ImageMagick, and persist to server
app.post("/api/upload-camp-panorama", express.raw({ type: "*/*", limit: "50mb" }), (req, res) => {
  try {
    const imgBuffer = req.body;
    if (!imgBuffer || !Buffer.isBuffer(imgBuffer) || imgBuffer.length === 0) {
      return res.status(400).json({ error: "No image data received" });
    }
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const rawTmpPath = path.join("/tmp", `raw_camp_upload_${Date.now()}.png`);
    fs.writeFileSync(rawTmpPath, imgBuffer);

    const publicPath = path.join(publicDir, "bataar_camp_real_panorama.jpg");

    // Process with ImageMagick to enhance sharpness, levels, and dynamic range while preserving 100% authentic scene composition
    try {
      execSync(`convert "${rawTmpPath}" -auto-level -contrast-stretch 0.2%x0.2% -unsharp 0x1.2+1.2+0.04 -quality 96 "${publicPath}"`);
      console.log("Successfully enhanced camp panorama with ImageMagick");
    } catch (imErr) {
      console.warn("ImageMagick convert failed, falling back to direct write:", imErr);
      fs.writeFileSync(publicPath, imgBuffer);
    }

    try { fs.unlinkSync(rawTmpPath); } catch (_) {}

    const enhancedBuffer = fs.readFileSync(publicPath);

    // Also write to dist if dist exists
    const distDir = path.join(process.cwd(), "dist");
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, "bataar_camp_real_panorama.jpg"), enhancedBuffer);
    }

    // Also update asset file so Vite bundles it
    const assetPath = path.join(process.cwd(), "src/assets/images/bataar_camp_panorama_1789887493780.jpg");
    if (fs.existsSync(path.dirname(assetPath))) {
      fs.writeFileSync(assetPath, enhancedBuffer);
    }

    console.log(`Successfully saved authentic camp panorama (${(enhancedBuffer.length / (1024 * 1024)).toFixed(2)} MB)`);
    return res.json({
      success: true,
      size: enhancedBuffer.length,
      url: `/bataar_camp_real_panorama.jpg?t=${Date.now()}`,
    });
  } catch (error: any) {
    console.error("Camp panorama upload error:", error);
    return res.status(500).json({ error: error.message || "Failed to save camp panorama" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
