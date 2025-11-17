// Selecionar elementos do HTML
const btnGerar = document.getElementById("btnGerar");
const inputTexto = document.getElementById("inputTexto");
const respostaIA = document.getElementById("respostaIA");

// Função simples para converter Markdown básico em HTML
function converterMarkdown(texto) {
    return texto
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **negrito**
        .replace(/\*(.*?)\*/g, "<em>$1</em>")             // *itálico*
        .replace(/\n/g, "<br>");                          // quebra de linha
}

// Função para chamar o backend
async function gerarRespostaIA(texto) {
    const BACKEND_URL = "/api/chat";

    try {
        respostaIA.innerHTML = "<em>Gerando resposta, por favor aguarde...</em>";

        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputTexto: texto })
        });

        const data = await response.json();

        if (data.error) {
            return data.error;
        }

        return converterMarkdown(data.resposta);

    } catch (error) {
        console.error("Erro:", error);
        return "Não foi possível conectar ao assistente. Tente novamente mais tarde.";
    }
}

// Evento do botão
btnGerar.addEventListener("click", async () => {
    const texto = inputTexto.value.trim();

    if (texto.length === 0) {
        respostaIA.textContent = "Por favor, escreva sua dúvida antes de pedir ajuda.";
        return;
    }

    const resposta = await gerarRespostaIA(texto);
    respostaIA.innerHTML = resposta;
});
