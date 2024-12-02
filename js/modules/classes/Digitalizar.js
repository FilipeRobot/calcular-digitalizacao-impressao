import precoGeral from '../Enum/Precos.js';

import Generico from './Generico.js';

import formatMoeda from '../functions/FormatMoeda.js';

export default class Digitalizar {
	constructor() {
		const preco = {
			documento: precoGeral['documento'],
			folhaEncadernada: precoGeral['folhaEncadernada'],
			papelComum: precoGeral['papelComum'],
		};

		const txt = [
			`Documentos (RG, CPF, CERTIDÃO, HABILITAÇÃO): ${formatMoeda(
				preco['documento']
			)} por Folha`,
			`Folhas encadernadas: ${formatMoeda(
				preco['folhaEncadernada']
			)} por Folha`,
			`Papel A4 (Comum): ${formatMoeda(preco['papelComum'])} por Folha`,
		];

		const qtdPadrao = 0;

		this.documento = new Generico(txt[0], preco['documento'], qtdPadrao);
		this.folhaEncadernada = new Generico(
			txt[1],
			preco['folhaEncadernada'],
			qtdPadrao
		);
		this.papelComum = new Generico(txt[2], preco['papelComum'], qtdPadrao);
	}
}
