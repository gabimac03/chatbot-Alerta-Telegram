// === telegram.js ===

import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_TOKEN } from "../config/config.js";

if (!TELEGRAM_TOKEN) {
  console.error("❌ ERROR: No se encontró TELEGRAM_TOKEN");
  process.exit(1);
}

// URL publica de Render (NO usar PUBLIC_URL ni NGROK)
const RENDER_URL = process.env.RENDER_EXTERNAL_URL; 
// Render la expone automáticamente en producción

if (!RENDER_URL) {
  console.error("❌ ERROR: Falta RENDER_EXTERNAL_URL (Render la crea solo en deploy)");
}

const bot = new TelegramBot(TELEGRAM_TOKEN, {
  webHook: true,
});

// Registrar webhook correcto
bot.setWebHook(`${RENDER_URL}/webhook`);

console.log("🤖 Bot Telegram con webhook en Render");

export default bot;
