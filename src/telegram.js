// === telegram.js ===

import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_TOKEN } from "../config/config.js";

if (!TELEGRAM_TOKEN) {
  console.error("❌ ERROR: No se encontró TELEGRAM_TOKEN");
  process.exit(1);
}

// URL pública de Render (Render la crea sola)
const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
if (!RENDER_URL) {
  console.error("❌ ERROR: Falta RENDER_EXTERNAL_URL");
}

const bot = new TelegramBot(TELEGRAM_TOKEN, {
  webHook: true,
});

// Registrar webhook
bot.setWebHook(`${RENDER_URL}/webhook`);

console.log("🤖 Bot Telegram con webhook activo");

export default bot;
