export function detectSimpleCommands(text) {
  text = text.toLowerCase();

  if (text.includes("hola") || text.includes("buenas")) {
    return "¡Hola! ¿En qué módulo o tema del curso necesitas ayuda?";
  }

  if (text.includes("gracias")) {
    return "¡De nada! Estoy para acompañarte durante el curso 😊";
  }

  return null; // Nada detectado → pasa a la IA
}
