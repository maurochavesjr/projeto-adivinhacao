let aleatorio = Math.floor(Math.random() * 100) + 1;
let tentativas = 1;
let jogoAtivo = true;

document.getElementById("guess").addEventListener("keyup", function(event) {
    if (event.key === "Enter" && jogoAtivo) {
        verificarPalpite();
    }
});

document.querySelector("button").addEventListener("click", function() {
    if (jogoAtivo) {
        verificarPalpite();
    } else {
        reiniciarJogo();
    }
});

function verificarPalpite() {
    if (!jogoAtivo) {
        return;
    }

    const palpite = parseInt(document.getElementById("guess").value);
    if (isNaN(palpite)) {
        setMessage("Por favor, insira um número válido.");
        return;
    }

    if (palpite < aleatorio) {
        setMessage(`O número secreto é maior! Tentativa ${tentativas}/5`);
    } else if (palpite > aleatorio) {
        setMessage(`O número secreto é menor! Tentativa ${tentativas}/5`);
    } else {
        // Verifica se o palpite é correto e se as tentativas excedem o limite
        if (tentativas >= 5) {
            jogoAtivo = false;
            setMessage(`Parabéns! Você acertou o número secreto em ${tentativas} tentativa(s).`);
            document.getElementById("message").classList.add("success");
            setTimeout(perguntarJogarNovamente, 500); // Exibe a mensagem por 500ms antes de perguntar
        } else {
            // Se o palpite for correto, mas as tentativas não excederem o limite, atualize o placar e informe o jogador sobre o acerto
            jogosGanhos++;
            totalJogos++;
            atualizarPlacar();
            setMessage(`Parabéns! Você acertou o número secreto em ${tentativas} tentativa(s).`);
        }
        return; // Adicione este return para evitar a execução do código abaixo em caso de acerto
    }

    document.getElementById("guess").value = "";

    tentativas++;
    if (tentativas > 5) {
        jogoAtivo = false;
        setMessage(`Você excedeu o número máximo de tentativas. O número secreto era ${aleatorio}.`);
        document.getElementById("message").classList.add("error");
        setTimeout(perguntarJogarNovamente, 500); // Exibe a mensagem por 500ms antes de perguntar
    }
}


function setMessage(message) {
    document.getElementById("message").textContent = message;
}

function perguntarJogarNovamente() {
    const playAgain = confirm("Deseja jogar novamente?");
    if (playAgain) {
        reiniciarJogo();
    } else {
        desativarEntrada();
    }
}

function reiniciarJogo() {
    aleatorio = Math.floor(Math.random() * 100) + 1;
    tentativas = 1;
    jogoAtivo = true;
    document.getElementById("guess").value = "";
    document.getElementById("message").textContent = "Tente adivinhar o número secreto entre 1 e 100 em 5 tentativas.";
    document.getElementById("message").classList.remove("success", "error");
    document.getElementById("guess").disabled = false;
}

function desativarEntrada() {
    document.getElementById("guess").disabled = true;
    document.getElementById("guess").value = "";
    document.querySelector("button").disabled = true;
}


