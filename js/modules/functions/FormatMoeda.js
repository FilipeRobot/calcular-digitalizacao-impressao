export default function formatMoeda(value) {
	const BRReal = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});
	return BRReal.format(value);
}