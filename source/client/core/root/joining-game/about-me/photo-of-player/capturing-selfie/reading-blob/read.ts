export async function read(canvas: OffscreenCanvas): Promise<Blob> {
	const blob: Blob = await canvas.convertToBlob({type: `image/png`});
	return blob;
}
