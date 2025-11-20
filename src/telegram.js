// === telegram.js ===
// Inicializa el bot de Telegram usando WebHooks

import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_TOKEN } from "../config/config.js";

if (!TELEGRAM_TOKEN) {
  console.error("❌ ERROR: No se encontró TELEGRAM_TOKEN en config.js o .env");
  process.exit(1);
}

// --- BOT CONFIGURADO EN MODO WEBHOOK ---
const bot = new TelegramBot(TELEGRAM_TOKEN, {
  webHook: {
    port: process.env.PORT || 3000,
  },
});

// Establecer la URL pública que viene desde NGROK
const PUBLIC_URL = process.env.PUBLIC_URL;

if (!PUBLIC_URL) {
  console.error("❌ ERROR: Falta PUBLIC_URL en .env");
  console.error("Ejemplo: PUBLIC_URL=https://xxxxx.ngrok-free.app");
  process.exit(1);
}

bot.setWebHook(`${PUBLIC_URL}/webhook`);

console.log("🤖 Bot de Telegram inicializado correctamente");

export default bot;
