
let zIndexAtual = 1;


function abrirJanela(idJanela) {
    const janela = document.getElementById(idJanela);
    janela.style.display = 'block'; 
    const posicaoIcone = iconeClicado.getBoundingClientRect();
    janela.style.left = (posicaoIcone.left + window.scrollX) + 'px';
    janela.style.top = (posicaoIcone.top + window.scrollY) + 'px';
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