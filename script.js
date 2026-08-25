let zIndexAtual = 500;
const MARGEM_TELA = 16;

function abrirJanela(idJanela, elementoIcone) {
    const janela = document.getElementById(idJanela);
    const jaEstavaAberta = janela.style.display === 'block';
    janela.style.display = 'block';
    if (elementoIcone && !jaEstavaAberta) {
        posicionarPertoDoIcone(janela, elementoIcone);
    }

    if (!jaEstavaAberta) {
        animarAbertura(janela, elementoIcone);
    }

    trazerParaFrente(janela);
}

function animarAbertura(janela, elementoIcone) {
    janela.style.transformOrigin = elementoIcone ? 'top left' : 'center';

    janela.classList.remove('abrindo');
    void janela.offsetWidth; // deixar replay
    janela.classList.add('abrindo');

    janela.addEventListener('animationend', () => {
        janela.classList.remove('abrindo');
    }, { once: true });
}

function posicionarPertoDoIcone(janela, elementoIcone) {
    const posicaoIcone = elementoIcone.getBoundingClientRect();
    const larguraJanela = janela.offsetWidth;
    const alturaJanela = janela.offsetHeight;

    let left = posicaoIcone.right + 16;
    let top = posicaoIcone.top;

    const maxLeft = window.innerWidth - larguraJanela - MARGEM_TELA;
    const maxTop = window.innerHeight - alturaJanela - MARGEM_TELA;

    left = Math.max(MARGEM_TELA, Math.min(left, maxLeft));
    top = Math.max(MARGEM_TELA, Math.min(top, maxTop));

    janela.style.left = left + 'px';
    janela.style.top = top + 'px';
}

function fecharJanela(idJanela) {
    const janela = document.getElementById(idJanela);
    const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    
    if (prefereMenosMovimento) { // sem animação apenas fecha
        janela.style.display = 'none';
        return;
    }

    animarFechamento(janela);
}

function animarFechamento(janela) {
    janela.classList.remove('fechando');
    void janela.offsetWidth;
    janela.classList.add('fechando');

    janela.addEventListener('animationend', () => {
        janela.classList.remove('fechando');
        janela.style.display = 'none';
    }, { once: true });
}

function trazerParaFrente(elementoJanela) {
    zIndexAtual++;
    elementoJanela.style.zIndex = zIndexAtual;
}

function tornarArrastavel(janela) {
    const barraTitulo = janela.querySelector('.aero-titlebar');
    if (!barraTitulo) return;

    let arrastando = false;
    let deslocamentoX = 0;
    let deslocamentoY = 0;

    barraTitulo.addEventListener('mousedown', (evento) => {
        // não arrastar nos botões
        if (evento.target.closest('.aero-caption')) return;

        arrastando = true;
        const retangulo = janela.getBoundingClientRect();
        deslocamentoX = evento.clientX - retangulo.left;
        deslocamentoY = evento.clientY - retangulo.top;

        barraTitulo.classList.add('arrastando');
        trazerParaFrente(janela);
        evento.preventDefault(); // corrigir bug de seleção de texto ao arrastar
    });

    document.addEventListener('mousemove', (evento) => {
        if (!arrastando) return;

        const larguraJanela = janela.offsetWidth;
        const alturaJanela = janela.offsetHeight;

        let novoLeft = evento.clientX - deslocamentoX;
        let novoTop = evento.clientY - deslocamentoY;

        
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


function tornarChatMsnArrastavel() {
    const janela = document.getElementById('chat-msn-flutuante');
    const alca = janela.querySelector('.chat-msn-drag-handle');
    if (!janela || !alca) return;

    let arrastando = false;
    let deslocamentoX = 0;
    let deslocamentoY = 0;

    alca.addEventListener('mousedown', (evento) => {
        arrastando = true;
        const retangulo = janela.getBoundingClientRect();
        deslocamentoX = evento.clientX - retangulo.left;
        deslocamentoY = evento.clientY - retangulo.top;

        // Trocar de bottom/right para top/left ao começar a arrastar
        janela.style.right = 'auto';
        janela.style.bottom = 'auto';
        janela.style.left = retangulo.left + 'px';
        janela.style.top = retangulo.top + 'px';

        evento.preventDefault();
    });

    document.addEventListener('mousemove', (evento) => {
        if (!arrastando) return;

        const larguraJanela = janela.offsetWidth;
        const alturaJanela = janela.offsetHeight;

        let novoLeft = evento.clientX - deslocamentoX;
        let novoTop = evento.clientY - deslocamentoY;

        novoLeft = Math.max(0, Math.min(novoLeft, window.innerWidth - larguraJanela));
        novoTop = Math.max(0, Math.min(novoTop, window.innerHeight - alturaJanela));

        janela.style.left = novoLeft + 'px';
        janela.style.top = novoTop + 'px';
    });

    document.addEventListener('mouseup', () => {
        arrastando = false;
    });
}

document.addEventListener('DOMContentLoaded', tornarChatMsnArrastavel);