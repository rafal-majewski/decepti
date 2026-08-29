<script lang="ts">
	import {dialog_} from "./dialog/module.ts";
	let isUsingCamera: boolean = $state(false);
	let isPhotoTaken: boolean = $state(false);
	let urlOfPhoto: string | undefined = $state();
	const props: {readonly input: HTMLInputElement | undefined} = $props();
	const handlers = {
		closeDialog: function closeDialog(): void {
			isUsingCamera = false;
		},
		handlePhoto: function handlePhoto(photo: File): void {
			if (props.input !== undefined) {
				const dataTransfer = new DataTransfer();
				dataTransfer.items.add(photo);
				props.input.files = dataTransfer.files;
			} else {
				/* empty */
			}
			if (urlOfPhoto !== undefined) {
				URL.revokeObjectURL(urlOfPhoto);
			} else {
				/* empty */
			}
			urlOfPhoto = URL.createObjectURL(photo);
			isPhotoTaken = true;
			isUsingCamera = false;
		},
		openDialog: function openDialog(): void {
			isUsingCamera = true;
		},
	};
</script>

{#if isPhotoTaken && urlOfPhoto !== undefined}<img
		alt="Twoje zdjęcie"
		src={urlOfPhoto} /><button
		onclick={handlers.openDialog}
		type="button">Zrób ponownie</button
	>{:else}<button
		onclick={handlers.openDialog}
		type="button">Dodaj zdjęcie</button
	>{/if}<dialog_.Dialog
	isOpen={isUsingCamera}
	onClose={handlers.closeDialog}
	onPhoto={handlers.handlePhoto}></dialog_.Dialog>

<style lang="scss">
	img {
		background-color: var(--color-surface-2);
		border: 0.125rem solid var(--color-accent);
		border-radius: var(--radius-md);
		display: block flow;
		height: auto;
		max-height: 16rem;
		max-width: 100%;
		object-fit: contain;
		width: auto;
	}
</style>
