// ... (Declarações de variáveis)

async function gerarRespostaIA(texto) {
    // Agora chama o endpoint Serverless do seu próprio Vercel!
    // /api/chat é mapeado para api/chat.js
    const BACKEND_URL = "/api/chat"; 
    
    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputTexto: texto 
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return data.error;
        }

        // A resposta vem pronta do servidor
        return data.resposta; 

    } catch (error) {
        console.error("Erro ao conectar com o servidor Vercel:", error);
        return "Não foi possível conectar ao assistente. Tente novamente mais tarde.";
    }
}
// ... (Restante do event listener do botão)