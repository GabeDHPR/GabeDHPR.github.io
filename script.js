let zIndexAtual = 1;
const MARGEM_TELA = 16; // distância mínima que uma janela deve manter das bordas da tela

function abrirJanela(idJanela, elementoIcone) {
    const janela = document.getElementById(idJanela);
    const jaEstavaAberta = janela.style.display === 'block';
    janela.style.display = 'block';

    // Só reposiciona perto do ícone se a janela ainda não estava aberta —
    // se já estava aberta (e talvez arrastada pelo usuário), clicar de novo
    // no ícone apenas traz ela pra frente, sem "teleportar" ela de volta.
    if (elementoIcone && !jaEstavaAberta) {
        posicionarPertoDoIcone(janela, elementoIcone);
    }

    trazerParaFrente(janela);
}

function posicionarPertoDoIcone(janela, elementoIcone) {
    const posicaoIcone = elementoIcone.getBoundingClientRect();
    const larguraJanela = janela.offsetWidth;
    const alturaJanela = janela.offsetHeight;

    // Abre a janela logo à direita/abaixo do ícone...
    let left = posicaoIcone.right + 16;
    let top = posicaoIcone.top;

    // ...mas nunca deixa nascer fora da tela visível. Isso evita tanto
    // janelas "sumidas" quanto o scroll indesejado que aparecia quando
    // elas abriam abaixo da área visível.
    const maxLeft = window.innerWidth - larguraJanela - MARGEM_TELA;
    const maxTop = window.innerHeight - alturaJanela - MARGEM_TELA;

    left = Math.max(MARGEM_TELA, Math.min(left, maxLeft));
    top = Math.max(MARGEM_TELA, Math.min(top, maxTop));

    janela.style.left = left + 'px';
    janela.style.top = top + 'px';
}

function fecharJanela(idJanela) {
    const janela = document.getElementById(idJanela);
    janela.style.display = 'none';
}

function trazerParaFrente(elementoJanela) {
    zIndexAtual++; // Aumenta o contador
    elementoJanela.style.zIndex = zIndexAtual;
}

// ---------------------------------------------------------------
// Arrastar janelas pela barra de título — permite realocar e
// sobrepor as janelas livremente, como num desktop de verdade.
// ---------------------------------------------------------------
function tornarArrastavel(janela) {
    const barraTitulo = janela.querySelector('.aero-titlebar');
    if (!barraTitulo) return;

    let arrastando = false;
    let deslocamentoX = 0;
    let deslocamentoY = 0;

    barraTitulo.addEventListener('mousedown', (evento) => {
        // não inicia arraste se o clique foi nos botões (minimizar/maximizar/fechar)
        if (evento.target.closest('.aero-caption')) return;

        arrastando = true;
        const retangulo = janela.getBoundingClientRect();
        deslocamentoX = evento.clientX - retangulo.left;
        deslocamentoY = evento.clientY - retangulo.top;

        barraTitulo.classList.add('arrastando');
        trazerParaFrente(janela);
        evento.preventDefault(); // evita selecionar texto durante o arraste
    });

    document.addEventListener('mousemove', (evento) => {
        if (!arrastando) return;

        const larguraJanela = janela.offsetWidth;
        const alturaJanela = janela.offsetHeight;

        let novoLeft = evento.clientX - deslocamentoX;
        let novoTop = evento.clientY - deslocamentoY;

        // mantém a janela sempre dentro da área visível da tela
        novoLeft = Math.max(0, Math.min(novoLeft, window.innerWidth - larguraJanela));
        novoTop = Math.max(0, Math.min(novoTop, window.innerHeight - alturaJanela));

        janela.style.left = novoLeft + 'px';
        janela.style.top = novoTop + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (!arrastando) return;
        arrastando = false;
        barraTitulo.classList.remove('arrastando');
    });
}

document.querySelectorAll('.aero-window').forEach(tornarArrastavel);
