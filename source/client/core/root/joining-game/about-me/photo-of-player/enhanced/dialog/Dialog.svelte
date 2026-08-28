<script lang="ts">
	import {capturingSelfie_} from "../../capturing-selfie/module.ts";
	let dialog: HTMLDialogElement | undefined = $state();
	let video: HTMLVideoElement | undefined = $state();
	let message: string | undefined = $state();
	const props: {
		readonly isOpen: boolean;
		readonly onClose: () => void;
		readonly onPhoto: (photo: File) => void;
	} = $props();
	function close(): void {
		props.onClose();
	}
	function takePhoto(): void {
		if (video === undefined) {
			return;
		}
		capturingSelfie_
			.capture(video)
			.then(function handlePhoto(photo: File): void {
				props.onPhoto(photo);
			})
			.catch(function handleCaptureError(): void {
				message = `Nie udało się zrobić zdjęcia.`;
			});
	}
	$effect(function toggleDialog(): void {
		if (props.isOpen) {
			message = undefined;
			dialog?.showModal();
		} else {
			dialog?.close();
		}
	});
	$effect(function setCamera(): (() => void) | undefined {
		if (!props.isOpen || video === undefined) {
			return;
		}
		const currentVideo = video;
		let mediaStream: MediaStream | null = null;
		navigator.mediaDevices
			.getUserMedia({audio: false, video: {facingMode: `user`}})
			.then(function handleStream(result: MediaStream): void {
				mediaStream = result;
				currentVideo.srcObject = result;
			})
			.catch(function handleCameraError(): void {
				message = `Nie udało się uzyskać dostępu do kamery.`;
			});
		return function stopCamera(): void {
			mediaStream?.getTracks().forEach(function stopTrack(track): void {
				track.stop();
			});
		};
	});
</script>

<dialog bind:this={dialog}
	><video
		autoplay
		bind:this={video}
		muted
		playsinline></video
	><div
		><button
			onclick={takePhoto}
			type="button">Zrób zdjęcie</button
		><button
			onclick={close}
			type="button">Anuluj</button
		></div
	></dialog
>{#if message}<p>{message}</p>{/if}

<style lang="scss">
	dialog {
		background: rgb(0 0 0);
		border: none;
		height: 100vh;
		margin: 0;
		max-height: 100vh;
		max-width: 100vw;
		padding: 0;
		position: relative;
		width: 100vw;
		video {
			display: block flow;
			height: 100%;
			object-fit: cover;
			width: 100%;
		}
		div {
			bottom: 0;
			display: block flex;
			gap: 1rem;
			justify-content: center;
			left: 0;
			padding: 1rem;
			position: absolute;
			right: 0;
		}
	}
</style>
