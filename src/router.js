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

  const habilitados = [1, 2]; // ACTIVOS

  const botones = [];

  const titulos = {
    1: "📚 Módulo 1 – Protección de la Información",
    2: "🔐 Módulo 2 – Correo Electrónico Seguro",
    3: "🗝️ Módulo 3 – Contraseñas Seguras",
    4: "💻 Módulo 4 – Puesto de Trabajo Seguro",
    5: "📱 Módulo 5 – Dispositivos Móviles",
    6: "🌐 Módulo 6 – Redes Sociales Seguras",
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

  const saludo = text.toLowerCase().trim();



  // === SALUDO REAL (NO DETECTA “módulo”) ===
  if (
    saludo === "hola" ||
    saludo === "buenas" ||
    saludo === "menu" ||
    saludo === "inicio"
  ) {
    await bot.sendMessage(chatId, "¡Hola! 😊 Elegí un módulo para comenzar:");
    return enviarMenu(chatId);
  }



  // === DETECTAR CAMBIO DE MÓDULO POR TEXTO (corto) ===
  // Permite: "modulo 1", "módulo 2", "quiero modulo 1"
  const matchModulo = saludo.match(/m[oó]dulo\s*(\d)/);

  if (matchModulo && saludo.length <= 12) {
    const numero = matchModulo[1];

    updateModule(chatId, numero);

    await bot.sendMessage(
      chatId,
      `📘 Cambiaste al *Módulo ${numero}*. Preguntame lo que quieras.`,
      { parse_mode: "Markdown" }
    );

    return;
  }



  // === Ya debe tener módulo elegido ===
  const user = getUser(chatId);

  if (!user.module_selected)
    return enviarMenu(chatId);



  // === Cargar contenido del módulo ===
  const contenido = getContenidoModulo(user.module_selected);

  if (!contenido)
    return bot.sendMessage(chatId, "El módulo aún no está cargado.");



  // === IA con teoría del módulo ===
  const prompt = `
Sos un asistente experto del curso A.L.E.R.T.A UNCuyo.
Respondé SOLO usando esta información del módulo ${user.module_selected}:

${contenido}

Pregunta del usuario:
${text}

Si no encontrás la respuesta, decí exactamente: "Necesito buscar afuera".
  `;

  const respuesta = await IA(prompt);
  return bot.sendMessage(chatId, respuesta);
}

