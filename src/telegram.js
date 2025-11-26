import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_TOKEN, WEBHOOK_URL } from "../config/config.js";

const bot = new TelegramBot(TELEGRAM_TOKEN, {
  webHook: true
});

// Telegram enviará actualizaciones a tu servidor
bot.setWebHook(`${WEBHOOK_URL}/webhook`);

console.log(`🤖 Webhook configurado en: ${WEBHOOK_URL}/webhook`);

export default bot;
