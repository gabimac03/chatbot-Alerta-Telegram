// === modules.js ===

import { MODULO_DETALLE } from "./module-data.js";

export function getContenidoModulo(modNumber) {
  const mod = MODULO_DETALLE[modNumber];
  if (!mod) return null;

  return mod.contenidoNarrativo; // Se devuelve TODO el módulo
}
