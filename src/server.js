import express from "express";
import bot from "./telegram.js";
import {
  enviarMenu,
  handleModuleSelection,
  handleUserMessage
} from "./router.js";

const app = express();
app.use(express.json());

// Webhook Telegram → Render recibe las actualizaciones
app.post("/webhook", async (req, res) => {
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    handleUserMessage(chatId, text);
  }

  if (update.callback_query) {
    const chatId = update.callback_query.message.chat.id;
    const data = update.callback_query.data;

    if (data === "volver_menu") {
      return enviarMenu(chatId);
    }

    if (data.startsWith("mod")) {
      const numero = data.replace("mod", "");
      return handleModuleSelection(chatId, numero);
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("🚀 Servidor con webhook activo"));
