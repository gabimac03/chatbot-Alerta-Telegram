// === webhook.js ===
// Servidor Express que recibe las peticiones de Telegram y las pasa al bot

import express from "express";
import bot from "./telegram.js";

const app = express();
app.use(express.json());

// === Ruta para mantener vivo el bot (cron-job) ===
app.get("/", (req, res) => {
  res.send("Bot activo OK");
});

// También podés usar /ping:
app.get("/ping", (req, res) => {
  res.send("pong");
});

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
