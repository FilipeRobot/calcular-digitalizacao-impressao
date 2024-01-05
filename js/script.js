function checkedBox(checkboxElement) {
    if (checkboxElement.name === 'digitalizar') {
        quantidadeDigitalizarElement = document.getElementById('quantidade-digitalizar');
        let isHidden = quantidadeDigitalizarElement.getAttribute('hidden');
        
        cleanQuantidadeDigitalizar();
        
        if (isHidden === null) {
            quantidadeDigitalizarElement.setAttribute('hidden', 'hidden');
        } else {
            quantidadeDigitalizarElement.removeAttribute('hidden');
        }
    }
    
    if (checkboxElement.name === 'imprimir') {
        quantidadeImprimirElement = document.getElementById('quantidade-imprimir');
        let isHidden = quantidadeImprimirElement.getAttribute('hidden');
        
        cleanQuantidadeImprimir()
        
        if (isHidden === null) {
            quantidadeImprimirElement.setAttribute('hidden', 'hidden');
        } else {
            quantidadeImprimirElement.removeAttribute('hidden');
        }
    }
}

function cleanQuantidadeDigitalizar() {
    let qtdDocumentos = document.getElementById('documento-quantidade');
    let qtdPapelEncadernada = document.getElementById('folha-encadernada-quantidade');
    let qtdPapelComum = document.getElementById('papel-comum-quantidade');
    qtdDocumentos.value = 0;
    qtdPapelEncadernada.value = 0;
    qtdPapelComum.value = 0;
}

function cleanQuantidadeImprimir() {
    let qtdPretoBranco = document.getElementById('preto-branco-quantidade');
    let qtdColorido = document.getElementById('colorido-quantidade');
    qtdPretoBranco.value = 0;
    qtdColorido.value = 0;
}

function calcular() {
    const qtdDocumentos = document.getElementById('documento-quantidade').value;
    const qtdPapelEncadernada = document.getElementById('folha-encadernada-quantidade').value;
    const qtdPapelComum = document.getElementById('papel-comum-quantidade').value;
    
    const qtdPretoBranco = document.getElementById('preto-branco-quantidade').value;
    const qtdColorido = document.getElementById('colorido-quantidade').value;
    
    const valorDocumento = 0.50;
    const valorPapelEncar = 0.30;
    const valorPapelComum = 0.20;
    
    const valorPretoBranco = 0.50;
    const valorColorido = 1;
    
    let valor = 0;
    
    valor += qtdDocumentos * valorDocumento;
    valor += qtdPapelEncadernada * valorPapelEncar;
    valor += qtdPapelComum * valorPapelComum;
    
    valor += qtdPretoBranco * valorPretoBranco;
    valor += qtdColorido * valorColorido;
    
    console.log(valor);
    
    return valor;
}

function formatPreco(valor) {
    const BRReal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return BRReal.format(valor);
}

function exibirValor() {
    let valorCalculadoElement = document.getElementById('valor-calculado');
    
    let valor = calcular();
    
    const valorFormatado = formatPreco(valor);
    
    valorCalculadoElement.innerHTML = valorFormatado;
}
