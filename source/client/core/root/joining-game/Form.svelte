<script lang="ts">
	import {enhance} from "$app/forms";
	import {resolve} from "$app/paths";
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

<form
	action={resolve(`/join-game`)}
	enctype="multipart/form-data"
	method="POST"
	use:enhance>
	<fieldset>
		<legend>O mnie</legend>
		<div>
			<label>
				<span>Nazwa:</span>
				<input
					name="name"
					placeholder="Wpisz nazwę"
					required
					type="text" />
			</label>
			<fieldset>
				<legend>Płeć</legend>
				<div>
					<label>
						<input
							name="gender"
							required
							type="radio"
							value="female" /> <span>Kobieta</span>
					</label>
					<label>
						<input
							name="gender"
							type="radio"
							value="male" /> <span>Mężczyzna</span>
					</label>
				</div>
			</fieldset>
			<div>
				<span>Zdjęcie:</span>
				{#if isEnhanced}
					{#if isPhotoTaken && urlOfPhoto !== undefined}
						<img
							alt="Twoje zdjęcie"
							src={urlOfPhoto} />
						<button
							onclick={handlers.openDialog}
							type="button">Zrób ponownie</button>
					{:else}
						<button
							onclick={handlers.openDialog}
							type="button">Dodaj zdjęcie</button>
					{/if}
				{/if}
				{#if message}<p>{message}</p>{/if}
				<input
					bind:this={photoInput}
					hidden={isEnhanced}
					name="photo"
					required
					type="file" />
			</div>
		</div>
	</fieldset>
	<div><button type="submit">Dołącz</button></div>
</form>

<dialog bind:this={dialog}>
	<video
		autoplay
		bind:this={video}
		muted
		playsinline></video>
	<div>
		<button
			onclick={handlers.takePhoto}
			type="button">Zrób zdjęcie</button>
		<button
			onclick={handlers.closeDialog}
			type="button">Anuluj</button>
	</div>
</dialog>

<style lang="scss">
	dialog {
		width: 100vw;
		height: 100vh;
		max-width: 100vw;
		max-height: 100vh;
		margin: 0;
		padding: 0;
		border: none;
		background: black;
		position: relative;

		video {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}

		div {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			display: flex;
			justify-content: center;
			gap: 1rem;
			padding: 1rem;
		}
	}

	img {
		display: block;
		max-width: 100%;
		height: auto;
	}
</style>
