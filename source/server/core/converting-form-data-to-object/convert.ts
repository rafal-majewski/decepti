export function convert(data: FormData): {[key: string]: FormDataEntryValue} {
	const object: {[key: string]: FormDataEntryValue} = Object.fromEntries(
		data.entries(),
	);
	return object;
}
