/**
 * Minimal export server: receives { svg } JSON and returns PNG buffer.
 * Notes:
 * - Requires sharp and its system deps (libvips).
 * - For production use, run this on a service that supports native binaries (Render, Railway, DigitalOcean, VPS).
 * - Alternatively use Puppeteer if you need exact browser rendering.
 *
 * npm i express sharp body-parser
 */
const express = require("express");
const bodyParser = require("body-parser");
const sharp = require("sharp");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));

app.post("/api/export", async (req, res) => {
  const { svg } = req.body;
  if (!svg) return res.status(400).send("svg missing");

  try {
    // Adjust width/height/density to meet print DPI requirements.
    // For vector designs you can render at large pixel size and let client download.
    const pngBuffer = await sharp(Buffer.from(svg))
      .png({ quality: 100 })
      .toBuffer();

    res.set("Content-Type", "image/png");
    res.send(pngBuffer);
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).send("Export failed");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Export server listening on ${PORT}`));