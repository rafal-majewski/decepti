import {readingBlob_} from "./reading-blob/module.ts";
export async function capture(
	videoHtmlElement: HTMLVideoElement,
): Promise<File> {
	const canvas: OffscreenCanvas = new OffscreenCanvas(
		videoHtmlElement.videoWidth,
		videoHtmlElement.videoHeight,
	);
	const context: null | OffscreenCanvasRenderingContext2D =
		canvas.getContext(`2d`);
	if (context === null) {
		const error: Error = new Error(`Cannot get a 2D context from the canvas.`);
		throw error;
	} else {
		context.drawImage(videoHtmlElement, 0, 0, canvas.width, canvas.height);
		const blobOfPhotos: Blob = await readingBlob_.read(canvas);
		const photo: File = new File([blobOfPhotos], `selfie.png`, {
			type: `image/png`,
		});
		return photo;
	}
}
