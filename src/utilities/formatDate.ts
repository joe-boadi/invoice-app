function parseAndValidateDate(inputDate: string): Date | null {
	const date = new Date(inputDate);
	return isNaN(date.getTime()) ? null : date;
}

export default function formatDate(inputDate: string): string {
	const date = parseAndValidateDate(inputDate);
	if (!date) return 'Invalid Date';

	return new Intl.DateTimeFormat('en', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
		.format(date)
		.split('/')
		.join('-');
}

export function formatToDateString(inputDate: string): string {
	const date = parseAndValidateDate(inputDate);
	if (!date) return 'Invalid Date';

	return new Intl.DateTimeFormat('en', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	}).format(date);
}
