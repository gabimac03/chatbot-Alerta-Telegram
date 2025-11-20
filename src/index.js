// === index.js ===
// Punto de entrada — Telegram + Webhook + DB

import app from "./webhook.js";        // Servidor Express REAL
import bot from "./telegram.js";       // Bot Telegram
import { createDB } from "./database.js";
import {
  enviarMenu,
  handleUserMessage,
  handleModuleSelection,
  handleSubtemaSelection,
  setDB
} from "./router.js";


const PORT = process.env.PORT || 10000;

// Inicializamos DB
const db = createDB();
setDB(db);

app.listen(PORT, () => {
  console.log(`Webhook activo en puerto ${PORT}`);
});

// === EVENTOS DEL BOT ===
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  // 🔒 Si intenta abrir un módulo bloqueado
  if (data.startsWith("lock_")) {
    const modulo = data.replace("lock_", "");
    return bot.sendMessage(chatId, `⚠️ El módulo ${modulo} todavía no está habilitado.`);
  }

  if (data.startsWith("mod")) return handleModuleSelection(chatId, data);
  if (data.startsWith("sub")) return handleSubtemaSelection(chatId, data);
});


bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (!text) return;

  if (text === "/start") return enviarMenu(chatId);

  handleUserMessage(chatId, text);
});
