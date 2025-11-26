// modules.js
// Extrae subtemas desde los contenidos largos del curso

import { MODULO_DETALLE } from "./module-data.js"; // este archivo contiene TODO lo que pegaste

export function getSubtemas(modNumber) {
  const mod = MODULO_DETALLE[modNumber];
  if (!mod) return [];

  const texto = mod.contenidoNarrativo;

  const coincidencias = [...texto.matchAll(/<h2>(.*?)<\/h2>/g)];

  return coincidencias.map((m, index) => ({
    id: `${index + 1}`,      // <--- AHORA NUMERICOS
    titulo: m[1],
  }));
}


// --- Devuelve contenido real del subtema ---
export function getContenidoSubtema(modNumber, subtemaId) {
  const mod = MODULO_DETALLE[modNumber];
  if (!mod) return null;

  const texto = mod.contenidoNarrativo;

  const h2s = [...texto.matchAll(/<h2>(.*?)<\/h2>/g)];

  // ID ya es numérico → solo convertir
  const index = Number(subtemaId) - 1;

  if (index < 0 || index >= h2s.length) return null;

  const titulo = h2s[index][1];

  const inicio = h2s[index].index;
  const fin = h2s[index + 1] ? h2s[index + 1].index : texto.length;

  const contenido = texto.slice(inicio, fin);

  return { titulo, contenido };
}

