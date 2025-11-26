// === webhook.js ===
// Servidor Express que recibe las peticiones de Telegram y las pasa al bot

import express from "express";
import bot from "./telegram.js";

const app = express();
app.use(express.json());

// === Ruta correcta para Webhook ===
app.post("/webhook", (req, res) => {
  try {
    bot.processUpdate(req.body);
  } catch (err) {
    console.error("❌ Error al procesar update:", err);
  }

  res.sendStatus(200);
});

// === Exportar app (IMPORTANTE) ===
export default app;
