// Serverless Function para Vercel
// Este código só roda no servidor, protegendo a chave de API.

// Para usar a Gemini API, você precisa instalar o SDK
// Vercel irá instalar as dependências listadas no seu package.json
// npm install @google/genai

const { GoogleGenAI } = require("@google/genai");

// A chave é automaticamente carregada do painel de Vercel (Environment Variables)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash"; // Um bom modelo para chat rápido

// Função principal que o Vercel executa
export default async function (req, res) {
    // 1. Garante que é uma requisição POST
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Método não permitido.' });
    }

    // 2. Extrai o texto do corpo da requisição
    const { inputTexto } = req.body;

    if (!inputTexto) {
        return res.status(400).send({ error: 'O texto de entrada é obrigatório.' });
    }

    try {
        // 3. Chamada SEGURA para a Gemini API
        const result = await ai.models.generateContent({
            model: model,
            contents: [{ role: "user", parts: [{ text: inputTexto }] }],
        });

        const resposta = result.text;

        // 4. Retorna a resposta para o seu frontend
        res.status(200).json({ resposta });

    } catch (error) {
        console.error("Erro na Gemini API:", error);
        // Retorna um erro genérico de segurança
        res.status(500).json({ error: "Erro interno do servidor ao processar a IA." });
    }
}