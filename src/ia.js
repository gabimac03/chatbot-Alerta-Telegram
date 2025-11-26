// === ia.js ===
// Cliente Groq actualizado a modelos 2025

import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../config/config.js";

const client = new Groq({ apiKey: GROQ_API_KEY });

export async function IA(prompt) {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Sos un asistente educativo amable y claro. Ayudás al alumno con dudas de ciberseguridad, informática y los módulos del curso."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.4
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("Error IA:", err?.response?.data || err);
    return "⚠️ La IA no pudo responder porque el modelo está en mantenimiento o la API Key no tiene permiso. Probá de nuevo.";
  }
}
