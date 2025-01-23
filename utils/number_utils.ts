export function commify(value: string | number, fixed?: number): string {
	const comps = String(value).split('.');

	if (
		comps.length > 2 ||
		!comps[0].match(/^-?[0-9]*$/) ||
		(comps[1] && !comps[1].match(/^[0-9]*$/)) ||
		value === '.' ||
		value === '-.'
	) {
		throw Error('Invalid value');
	}

	let whole = comps[0];

	let negative = '';
	if (whole.substring(0, 1) === '-') {
		negative = '-';
		whole = whole.substring(1);
	}

	while (whole.substring(0, 1) === '0') {
		whole = whole.substring(1);
	}
	if (whole === '') {
		whole = '0';
	}

	let suffix = '';
	if (comps.length === 2) {
		suffix = '.' + (fixed ? comps[1].slice(0, fixed) : comps[1] || '0');
	}

	const formatted = [];
	while (whole.length) {
		if (whole.length <= 3) {
			formatted.unshift(whole);
			break;
		} else {
			const index = whole.length - 3;
			formatted.unshift(whole.substring(index));
			whole = whole.substring(0, index);
		}
	}

	return negative + formatted.join(',') + suffix;
}

export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
