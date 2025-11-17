// Selecionar elementos do HTML
const btnGerar = document.getElementById("btnGerar");
const inputTexto = document.getElementById("inputTexto");
const respostaIA = document.getElementById("respostaIA");

// Função para chamar o backend (/api/chat)
async function gerarRespostaIA(texto) {
    const BACKEND_URL = "/api/chat";

    try {
        respostaIA.textContent = "Gerando resposta, por favor aguarde...";

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

        return data.resposta;

    } catch (error) {
        console.error("Erro ao conectar com o servidor Vercel:", error);
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
    respostaIA.textContent = resposta;
});
