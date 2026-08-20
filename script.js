
let zIndexAtual = 1;


function abrirJanela(idJanela) {
    const janela = document.getElementById(idJanela);
    janela.style.display = 'block'; 
    trazerParaFrente(janela);
}


function fecharJanela(idJanela) {
    const janela = document.getElementById(idJanela);
    janela.style.display = 'none';
}

function trazerParaFrente(elementoJanela) {
    zIndexAtual++; // Aumenta o contador
    elementoJanela.style.zIndex = zIndexAtual; 
}