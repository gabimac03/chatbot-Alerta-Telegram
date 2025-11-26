// router.js
import bot from "./telegram.js";
import { IA } from "./ia.js";
import { getSubtemas, getContenidoSubtema } from "./modules.js";

let db = null;
export function setDB(database) {
  db = database;
}

function getUser(chatId) {
  return db.prepare("SELECT * FROM users WHERE telegram_id = ?").get(String(chatId));
}

function createUser(chatId) {
  db.prepare(
    `INSERT OR IGNORE INTO users (telegram_id, state, module_selected, subtema_selected)
     VALUES (?, ?, ?, ?)`
  ).run(String(chatId), "idle", null, null);
}

function updateState(chatId, state) {
  db.prepare(`UPDATE users SET state = ? WHERE telegram_id = ?`).run(state, String(chatId));
}

function updateModule(chatId, moduleNumber) {
  db.prepare(`UPDATE users SET module_selected = ?, subtema_selected = NULL WHERE telegram_id = ?`)
    .run(String(moduleNumber), String(chatId));
}

function updateSubtema(chatId, subtema) {
  db.prepare(`UPDATE users SET subtema_selected = ? WHERE telegram_id = ?`)
    .run(subtema, String(chatId));
}

export function enviarMenu(chatId) {
  // MÓDULOS habilitados (editá esta lista cuando actives nuevos módulos)
  const habilitados = [1, 2]; // ← por ahora solo módulo 1 y 2 activados

  const botones = [];

  for (let i = 1; i <= 7; i++) {
    const titulos = {
      1: "📚 Módulo 1",
      2: "🔐 Módulo 2",
      3: "🗝️ Módulo 3",
      4: "💻 Módulo 4",
      5: "📱 Módulo 5",
      6: "🌐 Módulo 6",
      7: "🤖 Módulo 7"
    };

    if (habilitados.includes(i)) {
      // módulo habilitado
      botones.push([{ text: titulos[i], callback_data: `mod${i}` }]);
    } else {
      // módulo bloqueado con candado
      botones.push([{ text: `${titulos[i]} 🔒`, callback_data: `lock_${i}` }]);
    }
  }

  return bot.sendMessage(chatId, "✨ Hola, soy tu asistente virtual. Estoy acá para ayudarte con cualquier duda que tengas sobre los módulos, la plataforma o los temas de ciberseguridad.📘 Elegí un módulo para investigar:", {
    reply_markup: { inline_keyboard: botones }
  });
}


// ==========================
// MODULO → SUBTEMAS
// ==========================
export function handleModuleSelection(chatId, data) {
  const moduleNumber = data.replace("mod", "");

  updateModule(chatId, moduleNumber);
  updateState(chatId, "choose_subtema");

  const subtemas = getSubtemas(moduleNumber);

  const botones = subtemas.map((s) => [
    { text: `📌 ${s.titulo}`, callback_data: `sub_${moduleNumber}_${s.id}` }
  ]);

  bot.sendMessage(chatId, `📘 Elegiste el módulo *${moduleNumber}*.\nAhora elegí un subtema:`, {
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: botones }
  });
}

// =======================
// SUBTEMA SELECCIONADO
// =======================
export function handleSubtemaSelection(chatId, data) {
  const [, modulo, subtema] = data.split("_");

  bot.sendMessage(
    chatId,
    `📘 Elegiste el *subtema ${subtema} del módulo ${modulo}*.\n\nEscribime tu duda.`,
    { parse_mode: "Markdown" }
  );

  updateState(chatId, "asking_subtema");
  updateModule(chatId, modulo);
  updateSubtema(chatId, subtema);
}

// ==========================
// MENSAJE DEL USUARIO
// ==========================
export async function handleUserMessage(chatId, text) {
  createUser(chatId);
  const user = getUser(chatId);

  if (!user.module_selected) return enviarMenu(chatId);
  if (!user.subtema_selected)
    return bot.sendMessage(chatId, "Elegí un subtema primero tocando uno de los botones.");

  const contenido = getContenidoSubtema(user.module_selected, user.subtema_selected);

  if (contenido) {
    const prompt = `
Sos un asistente experto del curso A.L.E.R.T.A UNCuyo.
Usá SOLO esta información para responder:

${contenido.contenido}

Pregunta del usuario:
${text}

Si no encontrás la respuesta en el contenido, decí: "Necesito buscar afuera".
`;

    const respuesta = await IA(prompt);
    return bot.sendMessage(chatId, respuesta);
  }

  const respuesta = await IA(text);
  bot.sendMessage(chatId, respuesta);
}
