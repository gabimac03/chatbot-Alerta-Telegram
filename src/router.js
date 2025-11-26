// === router.js ===

import bot from "./telegram.js";
import { IA } from "./ia.js";
import { getContenidoModulo } from "./modules.js";

let db = null;

export function setDB(database) {
  db = database;
}

function getUser(chatId) {
  return db.prepare("SELECT * FROM users WHERE telegram_id = ?").get(String(chatId));
}

function createUser(chatId) {
  db.prepare(
    `INSERT OR IGNORE INTO users (telegram_id, state, module_selected)
     VALUES (?, ?, ?)`
  ).run(String(chatId), "idle", null);
}

function updateModule(chatId, moduleNumber) {
  db.prepare(
    `UPDATE users SET module_selected = ? WHERE telegram_id = ?`
  ).run(String(moduleNumber), String(chatId));
}


// ==========================
// MENÚ PRINCIPAL
// ==========================
export function enviarMenu(chatId) {
  const habilitados = [1, 2]; // Cambiá según activés módulos

  const botones = [];

  const titulos = {
    1: "📚 Módulo 1 – Protección de la Información",
    2: "🔐 Módulo 2 – Correo Electrónico Seguro",
    3: "🗝️ Módulo 3 – Contraseñas Seguras",
    4: "💻 Módulo 4 – Puesto de Trabajo Seguro",
    5: "📱 Módulo 5 – Dispositivos Móviles",
    6: "🌐 Módulo 6 – Redes Sociales",
    7: "🤖 Módulo 7 – IA Responsable"
  };

  for (let i = 1; i <= 7; i++) {
    if (habilitados.includes(i)) {
      botones.push([{ text: titulos[i], callback_data: `mod${i}` }]);
    } else {
      botones.push([{ text: `${titulos[i]} 🔒`, callback_data: `lock_${i}` }]);
    }
  }

  return bot.sendMessage(chatId, "📘 Elegí un módulo:", {
    reply_markup: { inline_keyboard: botones }
  });
}


// ==========================
// MÓDULO SELECCIONADO
// ==========================
export function handleModuleSelection(chatId, data) {
  const moduleNumber = data.replace("mod", "");

  updateModule(chatId, moduleNumber);

  bot.sendMessage(
    chatId,
    `📘 Elegiste el *Módulo ${moduleNumber}*.\nEscribime tu duda y te respondo usando SOLO la teoría del módulo.`,
    { parse_mode: "Markdown" }
  );
}


// ==========================
// MENSAJES DEL USUARIO
// ==========================
export async function handleUserMessage(chatId, text) {
  createUser(chatId);

  const saludo = text.toLowerCase();

  // === SALUDO AUTOMÁTICO + MENÚ ===
  if (
    saludo.includes("hola") ||
    saludo.includes("buenas") ||
    saludo.includes("menu") ||
    saludo.includes("inicio") ||
    saludo.includes("modulo") ||
    saludo.includes("módulo") ||
    saludo.includes("modulos") ||
    saludo.includes("módulos")
  ) {
    await bot.sendMessage(chatId, "¡Hola! 😊 Elegí un módulo para comenzar:");
    return enviarMenu(chatId);
  }

  const user = getUser(chatId);

  if (!user.module_selected)
    return enviarMenu(chatId);

  // Obtener contenido del módulo elegido
  const contenido = getContenidoModulo(user.module_selected);

  if (!contenido)
    return bot.sendMessage(chatId, "El módulo aún no está cargado.");

  // === IA con TEORÍA del módulo ===
  const prompt = `
Sos un asistente experto del curso A.L.E.R.T.A UNCuyo.
Respondé SOLO usando esta información del módulo ${user.module_selected}:

${contenido}

Pregunta del usuario:
${text}

Si no encontrás la respuesta, decí: "Necesito buscar afuera".
  `;

  const respuesta = await IA(prompt);
  return bot.sendMessage(chatId, respuesta);
}
