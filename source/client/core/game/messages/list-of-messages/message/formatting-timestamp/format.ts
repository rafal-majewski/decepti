export function format(timestamp: Date): string {
	const formattedTimestamp: string = timestamp.toLocaleTimeString(undefined, {
		hour: `2-digit`,
		minute: `2-digit`,
	});
	return formattedTimestamp;
}
