// === server.js ===

import express from "express";
import bot from "./telegram.js";
import { handleUserMessage, handleModuleSelection, enviarMenu } from "./router.js";
import { createDB } from "./database.js";

const app = express();
app.use(express.json());

// DB
const db = createDB();
import { setDB } from "./router.js";
setDB(db);



// Webhook de Telegram
app.post("/webhook", async (req, res) => {
  const update = req.body;

  console.log("📥 Update recibido:", JSON.stringify(update, null, 2));
  
  if (update.callback_query) {
    const chatId = update.callback_query.message.chat.id;
    const data = update.callback_query.data;

    if (data.startsWith("mod"))
      return handleModuleSelection(chatId, data);

    if (data.startsWith("lock_"))
      return bot.sendMessage(chatId, "⚠️ Este módulo aún no está habilitado.");
  }

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    return handleUserMessage(chatId, text);
  }

  res.sendStatus(200);
});

// Servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Servidor OK en puerto", PORT));
