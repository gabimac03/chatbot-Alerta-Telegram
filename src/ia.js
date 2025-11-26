// === ia.js ===
// Cliente Groq actualizado a modelo más estable (70B)

import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../config/config.js";

const client = new Groq({ apiKey: GROQ_API_KEY });

export async function IA(prompt) {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-70b-versatile",   // ⭐ Modelo más estable y preciso
      messages: [
        {
          role: "system",
          content:
            "Sos un asistente educativo claro, amable y preciso. Explicás conceptos de ciberseguridad usando SOLO la información proporcionada por el módulo. Evitá inventar o agregar contenido externo."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.2, // Menos inventos, más precisión
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("Error IA:", err?.response?.data || err);

    // Respuesta segura y clara al usuario
    return (
      "⚠️ La IA no pudo responder (posible mantenimiento del modelo o límite de la API).\n" +
      "Probá nuevamente en unos segundos."
    );
  }
}
