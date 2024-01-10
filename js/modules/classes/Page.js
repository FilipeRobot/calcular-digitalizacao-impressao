import precoGeral from '../Enum/Precos.js';

import Imprimir from './Imprimir.js';
import Digitalizar from './Digitalizar.js';
import Generico from './Generico.js';

import formatMoeda from '../functions/FormatMoeda.js';

export default class Page {
	constructor() {
		this.imprimir = new Imprimir();
		this.digitalizar = new Digitalizar();
		this.curriculo = new Generico(
			`${formatMoeda(precoGeral['curriculo'])}`,
			precoGeral['curriculo'],
			null
		);
	}
}
