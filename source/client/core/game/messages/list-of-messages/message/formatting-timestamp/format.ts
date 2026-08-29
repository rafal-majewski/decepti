export function format(timestamp: Date): string {
	const formattedTimestamp: string = timestamp.toLocaleTimeString(`pl-PL`, {
		hour: `2-digit`,
		minute: `2-digit`,
		hour12: false,
	});
	return formattedTimestamp;
}
