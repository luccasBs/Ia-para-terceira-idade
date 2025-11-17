import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Método não permitido." }),
        { status: 405 }
      );
    }

    const body = await req.json();
    const { inputTexto } = body;

    if (!inputTexto) {
      return new Response(
        JSON.stringify({ error: "O texto de entrada é obrigatório." }),
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(inputTexto);

    const resposta = result.response.text();

    return new Response(JSON.stringify({ resposta }), { status: 200 });

  } catch (error) {
    console.error("Erro na Gemini API:", error);

    return new Response(
      JSON.stringify({
        error: "Erro interno do servidor ao processar a IA.",
      }),
      { status: 500 }
    );
  }
}
