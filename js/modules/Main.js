import Page from './classes/Page.js';

import formatMoeda from './functions/FormatMoeda.js';

export default class Main {
	page = new Page();
	btnCalcular = document.querySelector('#btn_calcular');
	formCustos = document.querySelector('#form_custos');
	input = {
		qtdDocumento: this.formCustos.qtd_documento,
		qtdFolhaEncadernada: this.formCustos.qtd_folha_encadernada,
		qtdPapelComum: this.formCustos.qtd_papel_comum,
		qtdPretoBranco: this.formCustos.qtd_preto_branco,
		qtdColorido: this.formCustos.qtd_colorido,
	};
	checkboxes = this.formCustos.querySelectorAll('.__input--check');

	run() {
		/**
		 * Executar o calculo do custo total de digitalização e impressão
		 * com base na quantidade de tipos de digitalização e impressão que
		 * o usuário selecionou no formulário.
		 */
		this.btnCalcular.addEventListener('click', (event) => {
			event.preventDefault();

			this.mostrarResultado(this.calcular(this.validarInput()));
		});

		this.checkboxes.forEach((checkBox) => {
			checkBox.addEventListener('click', (event) => {
				const eventId = event.target.id;
				const elementId = '#qtd_' + eventId;
				let isHidden;

				switch (eventId) {
					case 'digitalizar':
						const qtdDigitalizarDiv =
							event.target.ownerDocument.querySelector(elementId);
						isHidden = qtdDigitalizarDiv.getAttribute('hidden');

						this.input.qtdDocumento.value = 0;
						this.input.qtdFolhaEncadernada.value = 0;
						this.input.qtdPapelComum.value = 0;

						if (isHidden === null) {
							qtdDigitalizarDiv.setAttribute('hidden', 'hidden');
						} else {
							qtdDigitalizarDiv.removeAttribute('hidden');
						}
						break;
					case 'imprimir':
						const qtdImprimirDiv =
							event.target.ownerDocument.querySelector(elementId);
						isHidden = qtdImprimirDiv.getAttribute('hidden');

						this.input.qtdPretoBranco.value = 1;
						this.input.qtdColorido.value = 0;

						if (isHidden === null) {
							qtdImprimirDiv.setAttribute('hidden', 'hidden');
						} else {
							qtdImprimirDiv.removeAttribute('hidden');
						}
						break;

					default:
						const qtdElementDiv =
							event.target.ownerDocument.querySelector(elementId);

						if (qtdElementDiv) {
							isHidden = qtdElementDiv.getAttribute('hidden');

							if (isHidden === null) {
								qtdElementDiv.setAttribute('hidden', 'hidden');
							} else {
								qtdElementDiv.removeAttribute('hidden');
							}
						}
						break;
				}
			});
		});

		this.mostrarPrecos();
		this.mostrarResultado(this.calcular(this.validarInput()));
	}

	calcular(isValid) {
		const precisaDigitalizar = this.formCustos.digitalizar.checked;
		const precisaImprimir = this.formCustos.imprimir.checked;
		const curriculo = this.formCustos.curriculo.checked;

		let valor = 0;

        if (!isValid) {
            console.log(isValid);
            console.log('não executa calculo');
            return 0;
        }

        this.getUserInput();

		if (precisaDigitalizar) {
			valor +=
				this.page.digitalizar.documento.qtd *
				this.page.digitalizar.documento.preco;
			valor +=
				this.page.digitalizar.folhaEncadernada.qtd *
				this.page.digitalizar.folhaEncadernada.preco;
			valor +=
				this.page.digitalizar.papelComum.qtd *
				this.page.digitalizar.papelComum.preco;
		}

		if (precisaImprimir) {
			valor +=
				this.page.imprimir.pretoBranco.qtd *
				this.page.imprimir.pretoBranco.preco;
			valor +=
				this.page.imprimir.colorido.qtd *
				this.page.imprimir.colorido.preco;
		}

		if (curriculo) {
			valor += this.page.curriculo.preco;
		}

		return valor;
	}

	getUserInput() {
		this.page.digitalizar.documento.qtd = Number.parseInt(
			this.input.qtdDocumento.value
		);
		this.page.digitalizar.folhaEncadernada.qtd = Number.parseInt(
			this.input.qtdFolhaEncadernada.value
		);
		this.page.digitalizar.papelComum.qtd = Number.parseInt(
			this.input.qtdPapelComum.value
		);
		this.page.imprimir.pretoBranco.qtd = Number.parseInt(
			this.input.qtdPretoBranco.value
		);
		this.page.imprimir.colorido.qtd = Number.parseInt(
			this.input.qtdColorido.value
		);
	}

	mostrarResultado(valor) {
		const resultado = document.querySelector('#valor_calculado');
		resultado.innerHTML = formatMoeda(valor);
	}

	mostrarPrecos() {
		const textos = document.querySelectorAll('.__text');

		textos.forEach((texto) => {
			switch (texto.id) {
				case 'txt_documento':
					texto.innerHTML = this.page.digitalizar.documento.txt;
					break;
				case 'txt_folha_encadernada':
					texto.innerHTML =
						this.page.digitalizar.folhaEncadernada.txt;
					break;
				case 'txt_papel_comum':
					texto.innerHTML = this.page.digitalizar.papelComum.txt;
					break;
				case 'txt_preto_barnco':
					texto.innerHTML = this.page.imprimir.pretoBranco.txt;
					break;
				case 'txt_colorido':
					texto.innerHTML = this.page.imprimir.colorido.txt;
					break;
				case 'txt_curriculo':
					texto.innerHTML = this.page.curriculo.txt;
					break;
				default:
					// code break
					break;
			}
		});
	}

    validarInput() {
        let isValid = true;
        // Validar input do usuário no momento em que ele muda o valor do input
		for (const key in this.input) {
			if (Object.hasOwnProperty.call(this.input, key)) {
				const element = this.input[key];
				element.addEventListener('change', (event) => {
					/**
					 *  Validar se a quantidade que o usuário quer é menor que 0 (zero)
					 */
					if (Number.parseInt(event.srcElement.value) < 0) {
						event.srcElement.classList.add('erro');
						event.srcElement.value = 0;
                        isValid = false;
						return;
					}

					/**
					 * Validar se a quantidade que o usuário quer é maior que 50 (cinquenta)
					 */
					if (Number.parseInt(event.srcElement.value) > 50) {
						event.srcElement.classList.add('erro');
						event.srcElement.value = 50;
                        isValid = false;
						return;
					}

					event.srcElement.classList.remove('erro');
				});
			}
		}
        return isValid;
    }
}
