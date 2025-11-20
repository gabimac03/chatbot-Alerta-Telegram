import TelegramBot from "node-telegram-bot-api";
import { generarRespuesta } from "./src/ia.js";
import dotenv from "dotenv";
dotenv.config();

// ESTA ES LA CORRECCIÓN:
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// Función para dividir mensajes largos
function dividirRespuesta(texto, max = 4000) {
  const partes = [];
  let inicio = 0;

  while (inicio < texto.length) {
    partes.push(texto.slice(inicio, inicio + max));
    inicio += max;
  }

  return partes;
}

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const pregunta = msg.text;

  console.log("📩 Mensaje recibido:", pregunta);

  try {
    const respuesta = await generarRespuesta(pregunta);

    const partes = dividirRespuesta(respuesta);

    for (const parte of partes) {
      await bot.sendMessage(chatId, parte);
    }

  } catch (err) {
    console.error("❌ Error en IA:", err);
    bot.sendMessage(chatId, "Hubo un error generando la respuesta.");
  }
});

console.log("🤖 Bot en funcionamiento usando Long Polling...");
