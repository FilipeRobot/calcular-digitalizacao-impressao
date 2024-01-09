const btnCalcular = document.querySelector('#btn_calcular');

const valores = {
	digitalizar: {
		documento: 0.5,
		folhaEncadernada: 0.3,
		papelComum: 0.2,
	},
	imprimir: {
		pretoBranco: 0.5,
		colorido: 1,
	},
};

const user = {
	digitalizar: {
		qtdDocumento: 0,
		qtdFolhaEncadernada: 0,
		qtdPapelComum: 0,
	},
	imprimir: {
		qtdPretoBranco: 1,
		qtdColorido: 0,
	},
};

const formCustos = document.querySelector('#form_custos');

const input = {
	qtdDocumento: formCustos.qtd_documento,
	qtdFolhaEncadernada: formCustos.qtd_folha_encadernada,
	qtdPapelComum: formCustos.qtd_papel_comum,
	qtdPretoBranco: formCustos.qtd_preto_branco,
	qtdColorido: formCustos.qtd_colorido,
};

// Validar input do usuário no momento em que ele muda o valor do input
for (const key in input) {
	if (Object.hasOwnProperty.call(input, key)) {
		const element = input[key];
		element.addEventListener('change', (event) => {
			/**
			 *  Validar se a quantidade que o usuário quer é menor que 0 (zero)
			 */
			if (Number.parseInt(event.srcElement.value) < 0) {
				event.srcElement.classList.add('erro');
				event.srcElement.value = 0;
				return;
			}

			/**
			 * Validar se a quantidade que o usuário quer é maior que 50 (cinquenta)
			 */
			if (Number.parseInt(event.srcElement.value) > 50) {
				event.srcElement.classList.add('erro');
				event.srcElement.value = 50;
				return;
			}

			event.srcElement.classList.remove('erro');
		});
	}
}

/**
 * Executar o calculo do custo total de digitalização e impressão
 * com base na quantidade de tipos de digitalização e impressão que
 * o usuário selecionou no formulário.
 */
btnCalcular.addEventListener('click', (event) => {
	event.preventDefault();

	const precisaDigitalizar = formCustos.digitalizar.checked;
	const precisaImprimir = formCustos.imprimir.checked;

	let valor = 0;

	if (precisaDigitalizar) {
		user.digitalizar = {
			qtdDocumento: Number.parseInt(input.qtdDocumento.value),
			qtdFolhaEncadernada: Number.parseInt(
				input.qtdFolhaEncadernada.value
			),
			qtdPapelComum: Number.parseInt(input.qtdPapelComum.value),
		};

		valor += user.digitalizar.qtdDocumento * valores.digitalizar.documento;
		valor +=
			user.digitalizar.qtdFolhaEncadernada *
			valores.digitalizar.folhaEncadernada;
		valor +=
			user.digitalizar.qtdPapelComum * valores.digitalizar.papelComum;
	}

	if (precisaImprimir) {
		user.imprimir = {
			qtdPretoBranco: Number.parseInt(input.qtdPretoBranco.value),
			qtdColorido: Number.parseInt(input.qtdColorido.value),
		};

		valor += user.imprimir.qtdPretoBranco * valores.imprimir.pretoBranco;
		valor += user.imprimir.qtdColorido * valores.imprimir.colorido;
	}

	mostrarResultado(valor);
});

const checkboxes = formCustos.querySelectorAll('.__input--check');

checkboxes.forEach((checkBox) => {
	checkBox.addEventListener('click', (event) => {
		const idDigitalizar = 'digitalizar';
		const idImprimir = 'imprimir';
		const eventId = event.target.id;

		if (eventId === idDigitalizar) {
			const qtdDigitalizarDiv =
				event.target.ownerDocument.querySelector('#qtd_digitalizar');
			const isHidden = qtdDigitalizarDiv.getAttribute('hidden');

			input.qtdDocumento.value = 0;
			input.qtdFolhaEncadernada.value = 0;
			input.qtdPapelComum.value = 0;

			if (isHidden === null) {
				qtdDigitalizarDiv.setAttribute('hidden', 'hidden');
			} else {
				qtdDigitalizarDiv.removeAttribute('hidden');
			}
		}

		if (eventId === idImprimir) {
			const qtdImprimirDiv =
				event.target.ownerDocument.querySelector('#qtd_imprimir');
			const isHidden = qtdImprimirDiv.getAttribute('hidden');

			input.qtdPretoBranco.value = 0;
			input.qtdColorido.value = 0;

			if (isHidden === null) {
				qtdImprimirDiv.setAttribute('hidden', 'hidden');
			} else {
				qtdImprimirDiv.removeAttribute('hidden');
			}
		}
	});
});

function mostrarResultado(valor) {
	const resultado = document.querySelector('#valor_calculado');
	const BRReal = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});
	resultado.innerHTML = BRReal.format(valor);
}
