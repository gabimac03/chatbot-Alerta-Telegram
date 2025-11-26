// === index.js ===

import express from "express";
import bot from "./telegram.js";
import {
  handleUserMessage,
  enviarMenu,
  handleModuleSelection
} from "./router.js";

import { setDB } from "./router.js";
import { createDB } from "./database.js";

const app = express();
app.use(express.json());

// --- Inicializar DB ---
const db = createDB();
setDB(db);

// --- Webhook Telegram ---
app.post("/webhook", async (req, res) => {
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    await handleUserMessage(chatId, text);
  }

  if (update.callback_query) {
    const chatId = update.callback_query.message.chat.id;
    const data = update.callback_query.data;

    if (data.startsWith("mod")) {
      return handleModuleSelection(chatId, data);
    }

    if (data.startsWith("lock_")) {
      return bot.sendMessage(chatId, "⚠️ Ese módulo todavía no está habilitado.");
    }
  }

  res.sendStatus(200);
});

// --- Iniciar servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
