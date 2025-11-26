// === database.js ===
// Base de datos local SQLite para guardar progreso del usuario

import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export function createDB() {
  const dbPath = path.join(process.cwd(), "data", "db.sqlite");

  // Crear carpeta /data si no existe
  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }

  const db = new Database(dbPath);

  // Crear tabla con TODAS las columnas que usa el router.js
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      -- Identificación del usuario
      chat_id TEXT UNIQUE,
      telegram_id TEXT,

      -- Estado del flujo
      state TEXT DEFAULT 'idle',

      -- Módulos / subtemas
      module_selected TEXT,
      subtema_selected TEXT,

      -- Últimas interacciones
      ultima_pregunta TEXT,

      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  console.log("📌 Base de datos inicializada correctamente");
  return db;
}
