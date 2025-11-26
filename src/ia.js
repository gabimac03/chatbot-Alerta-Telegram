import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../config/config.js";

const client = new Groq({ apiKey: GROQ_API_KEY });

export async function IA(contexto, pregunta) {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `Sos un asistente educativo del curso A.L.E.R.T.A UNCuyo. Responde SOLO según este contenido: ${contexto}`
        },
        { role: "user", content: pregunta }
      ],
      max_tokens: 150,
      temperature: 0.3
    });

    return completion.choices[0].message.content;
  } catch (e) {
    return "⚠️ La IA no pudo responder en este momento.";
  }
}
