import precoGeral from '../Enum/Precos.js';

import Generico from './Generico.js';

import formatMoeda from '../functions/FormatMoeda.js';

export default class Imprimir {
	constructor() {
		const preco = {
			pretoBranco: precoGeral['pretoBranco'],
			colorido: precoGeral['colorido'],
		};

		const txt = [
			`Preto e Branco: ${formatMoeda(preco['pretoBranco'])} por Folha`,
			`Colorido: ${formatMoeda(preco['colorido'])} por Folha`,
		];

		const qtdPadrao = 0;

		this.pretoBranco = new Generico(txt[0], preco['pretoBranco'], 0);
		this.colorido = new Generico(txt[1], preco['colorido'], 0);
	}
}
