// === index.js ===

import app from "./webhook.js";
import bot from "./telegram.js";
import { createDB } from "./database.js";
import {
  enviarMenu,
  handleUserMessage,
  handleModuleSelection,
  handleSubtemaSelection,
  setDB
} from "./router.js";

const PORT = process.env.PORT || 3000;

// Inicializamos DB
const db = createDB();
setDB(db);


// === EVENTOS DEL BOT ===
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

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


// === IMPORTANTE: INICIAR SERVIDOR EXPRESS ===
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express en puerto ${PORT}`);
});
