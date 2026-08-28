<script lang="ts">
	import {capturingSelfie_} from "./capturing-selfie/module.ts";
	import {onMount} from "svelte";
	let photoInput: HTMLInputElement | undefined = $state();
	let dialog: HTMLDialogElement | undefined = $state();
	let video: HTMLVideoElement | undefined = $state();
	let isUsingCamera: boolean = $state(false);
	let isPhotoTaken: boolean = $state(false);
	let message: string | undefined = $state();
	let urlOfPhoto: string | undefined = $state();
	let isEnhanced: boolean = $state(false);
	onMount(function enableEnhancement(): void {
		isEnhanced = true;
		return;
	});
	const handlers = {
		closeDialog: function closeDialog(): void {
			isUsingCamera = false;
			dialog?.close();
		},
		openDialog: function openDialog(): void {
			message = undefined;
			isUsingCamera = true;
			dialog?.showModal();
		},
		takePhoto: function takePhoto(): void {
			if (video === undefined) {
				return;
			}
			capturingSelfie_
				.capture(video)
				.then(function handlePhoto(photo: File): void {
					if (photoInput !== undefined) {
						const dataTransfer = new DataTransfer();
						dataTransfer.items.add(photo);
						photoInput.files = dataTransfer.files;
					}
					if (urlOfPhoto !== undefined) {
						URL.revokeObjectURL(urlOfPhoto);
					}
					urlOfPhoto = URL.createObjectURL(photo);
					isPhotoTaken = true;
					handlers.closeDialog();
				})
				.catch(function handleCaptureError(): void {
					message = `Nie udało się zrobić zdjęcia.`;
				});
		},
	};

	$effect(function setCamera(): (() => void) | undefined {
		if (!isUsingCamera || video === undefined) {
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

<div
	><label
		><span>Zdjęcie:</span>
		{#if isEnhanced}{#if isPhotoTaken && urlOfPhoto !== undefined}<img
					alt="Twoje zdjęcie"
					src={urlOfPhoto} /><button
					onclick={handlers.openDialog}
					type="button">Zrób ponownie</button
				>{:else}<button
					onclick={handlers.openDialog}
					type="button">Dodaj zdjęcie</button
				>{/if}{/if}{#if message}<p>{message}</p>{/if}<input
			bind:this={photoInput}
			hidden={isEnhanced}
			name="photo"
			required
			type="file" /><dialog bind:this={dialog}
			><video
				autoplay
				bind:this={video}
				muted
				playsinline></video
			><div
				><button
					onclick={handlers.takePhoto}
					type="button">Zrób zdjęcie</button
				><button
					onclick={handlers.closeDialog}
					type="button">Anuluj</button
				></div
			></dialog
		></label
	></div>

<style lang="scss">
	dialog {
		background: #000000;
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
	img {
		display: block flow;
		height: auto;
		max-width: 100%;
	}
</style>
