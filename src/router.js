// === router.js ===

// --- Imports ---
import bot from "./telegram.js";
import { IA } from "./ia.js";
import { getContenidoModulo } from "./modules.js";

// --- Base de datos local ---
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

export function updateModule(chatId, moduleNumber) {
  db.prepare(
    `UPDATE users SET module_selected = ? WHERE telegram_id = ?`
  ).run(moduleNumber, String(chatId));
}



// ==========================
// MENÚ PRINCIPAL
// ==========================
export function enviarMenu(chatId) {
  const habilitados = [1, 2];

  const titulos = {
    1: "📚 Módulo 1 – Protección de la Información",
    2: "🔐 Módulo 2 – Correo Seguro",
    3: "🗝️ Módulo 3 – Contraseñas Seguras",
    4: "💻 Módulo 4 – Puesto Seguro",
    5: "📱 Módulo 5 – Dispositivos Móviles",
    6: "🌐 Módulo 6 – Redes Sociales",
    7: "🤖 Módulo 7 – IA Responsable"
  };

  const botones = [];

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
// MANEJO DE SELECCIÓN
// ==========================
export function handleModuleSelection(chatId, data) {
  const numero = data.replace("mod", "");

  updateModule(chatId, numero);

  return bot.sendMessage(
    chatId,
    `📘 Elegiste el *Módulo ${numero}*.\nEscribime tu duda y te respondo usando SOLO la teoría del módulo.`,
    { parse_mode: "Markdown" }
  );
}



// ==========================
// MANEJO DE MENSAJES
// ==========================
export async function handleUserMessage(chatId, text) {

  createUser(chatId);
  const user = getUser(chatId);

  const mensaje = text.toLowerCase().trim();



  // === SALUDOS (rápido) ===
  if (["hola", "buenas", "menu", "inicio"].includes(mensaje)) {
    await bot.sendMessage(chatId, "¡Hola! 😊 Elegí un módulo para comenzar:");
    return enviarMenu(chatId);
  }



  // === Detectar “modulo 1”, “módulo 2”, etc. ===
  const match = mensaje.match(/m[oó]dulo\s*(\d)/);

  if (match) {
    const numero = match[1];
    updateModule(chatId, numero);

    return bot.sendMessage(
      chatId,
      `📘 Cambiaste al *Módulo ${numero}*. Preguntame lo que quieras.`,
      { parse_mode: "Markdown" }
    );
  }



  // === Si NO tiene módulo → mostrar menú ===
  if (!user.module_selected) {
    return enviarMenu(chatId);
  }



  // === Obtener teoría del módulo ===
  const contenido = getContenidoModulo(user.module_selected);

  if (!contenido)
    return bot.sendMessage(chatId, "⚠️ El módulo aún no está configurado.");



  // === OPTIMIZACIÓN: prompt corto y eficiente ===
  const prompt = `
Respondé usando SOLO esta teoría del módulo ${user.module_selected}:

${contenido}

Pregunta del usuario:
"${text}"

Si no encontrás la respuesta exacta en la teoría, respondé: "Necesito buscar afuera".
  `;



  // === Ejecutar IA (rápido) ===
  let respuesta;

  try {
    respuesta = await IA(prompt);
  } catch (e) {
    console.error("❌ Error IA:", e);
    return bot.sendMessage(chatId, "Hubo un error generando la respuesta.");
  }


  // === Respuesta + botón volver ===
  return bot.sendMessage(chatId, respuesta, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🔙 Volver al menú", callback_data: "volver_menu" }]
      ]
    }
  });
}
