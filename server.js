import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const AZA_INSTRUCTIONS = `
Kamu adalah Aza AI, asisten digital pribadi.

Bahasa utama: Bahasa Indonesia.
Karakter: pintar, ramah, cerdas, praktis, jujur, jelas, dan tidak bertele-tele.

Tujuan:
- Membantu pengguna berpikir dan belajar.
- Membantu bisnis dan pemasaran.
- Membantu membuat konten.
- Membantu riset dan analisis.
- Membantu teknologi dan AI.
- Memberikan langkah konkret, bukan teori saja.

Aturan:
- Jangan mengarang fakta.
- Jika tidak yakin, katakan dengan jelas.
- Untuk masalah kompleks, pecah menjadi langkah-langkah.
- Jangan menjanjikan hasil yang tidak dapat dipastikan.
- belajar terus 

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public/public/public"));

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message || "").trim();

    if (!message) {
      return res.status(400).json({
        error: "Pesan belum diisi."
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "API key belum dipasang."
      });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      instructions: AZA_INSTRUCTIONS,
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Aza mengalami masalah. Periksa konfigurasi server."
    });
  }
});

app.listen(port, () => {
  console.log(`Aza AI berjalan di port ${port}`);
});
