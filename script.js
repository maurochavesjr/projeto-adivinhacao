let aleatorio = Math.floor(Math.random() * 100) + 1;
let tentativas = 1;
let jogoAtivo = true;

document.getElementById("guess-form").addEventListener("submit", function(event) {
    event.preventDefault();
    verificarPalpite();
});

document.getElementById("adivinharButton").addEventListener("click", function() {
    verificarPalpite();
});

document.getElementById("guess").addEventListener("input", function() {
    // Limpar mensagem ao começar a digitar
    setMessage("");
});

document.getElementById("guess").addEventListener("keyup", function(event) {
    if (event.key === "Enter" && jogoAtivo) {
        verificarPalpite();
    }
});

function verificarPalpite() {
    const palpiteInput = document.getElementById("guess");
    const palpite = parseInt(palpiteInput.value);

    if (!isNaN(palpite) && palpite >= 1 && palpite <= 100) {
        if (palpite < aleatorio) {
            setMessage(`O número secreto é maior! Tentativa ${tentativas}/5`);
        } else if (palpite > aleatorio) {
            setMessage(`O número secreto é menor! Tentativa ${tentativas}/5`);
        } else if (palpite === aleatorio){
            jogoAtivo = false;
            setMessage(`Parabéns! Você acertou o número secreto em ${tentativas} tentativa(s).`);
            document.getElementById("message").classList.add("success");
            setTimeout(perguntarJogarNovamente, 500);
        } 
        
        // Limpar entrada
        palpiteInput.value = "";

        tentativas++;

        if (tentativas > 5) {
            jogoAtivo = false;
            setMessage(`Você excedeu o número máximo de tentativas. O número secreto era ${aleatorio}.`);
            document.getElementById("message").classList.add("error");
            setTimeout(perguntarJogarNovamente, 500);
        }
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
}

function desativarEntrada() {
    document.getElementById("guess").disabled = true;
    document.getElementById("adivinharButton").disabled = true;
}
