import bot from "./telegram.js";
import { MODULOS } from "./modules.js";
import { IA } from "./ia.js";

// Estado simple en memoria
const userState = {};

export function enviarMenu(chatId) {
  const botones = [
    [{ text: "📚 Módulo 1", callback_data: "mod1" }],
    [{ text: "🔐 Módulo 2", callback_data: "mod2" }]
  ];

  return bot.sendMessage(chatId, "📘 Elegí un módulo:", {
    reply_markup: { inline_keyboard: botones }
  });
}

export function handleModuleSelection(chatId, moduleNumber) {
  userState[chatId] = moduleNumber;

  return bot.sendMessage(
    chatId,
    `📘 Elegiste *${MODULOS[moduleNumber].titulo}*.\nEscribime tu duda.`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔙 Volver al menú", callback_data: "volver_menu" }]
        ]
      }
    }
  );
}

export async function handleUserMessage(chatId, text) {
  const saludo = text.toLowerCase();

  if (["hola", "/start", "buenas", "menu"].includes(saludo)) {
    return enviarMenu(chatId);
  }

  if (!userState[chatId]) {
    return enviarMenu(chatId);
  }

  const mod = userState[chatId];
  const contexto = MODULOS[mod].contenido;

  const respuesta = await IA(contexto, text);

  return bot.sendMessage(chatId, respuesta, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🔙 Volver al menú", callback_data: "volver_menu" }]
      ]
    }
  });
}
