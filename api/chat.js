import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Método não permitido.' });
    }

    const { inputTexto } = req.body;

    if (!inputTexto) {
        return res.status(400).json({ error: "O texto de entrada é obrigatório." });
    }

    try {
        const result = await ai.models.generateContent({
            model: model,
            contents: [{ role: "user", parts: [{ text: inputTexto }] }]
        });

        const resposta = result.text();

        return res.status(200).json({ resposta });

    } catch (error) {
        console.error("Erro na Gemini API:", error);
        return res.status(500).json({ error: "Erro interno do servidor ao processar a IA." });
    }
}
