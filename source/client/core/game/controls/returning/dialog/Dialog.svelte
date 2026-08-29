<script lang="ts">
	let dialog: HTMLDialogElement | undefined = $state();
	const props: {readonly isOpen: boolean; readonly onClose: () => void} =
		$props();
	$effect(function toggleDialog(): void {
		if (props.isOpen) {
			dialog?.showModal();
		} else {
			dialog?.close();
		}
	});
</script>

<dialog
	bind:this={dialog}
	onclose={props.onClose}
	><h2>Zwołano spotkanie!</h2><p>Wróć do bazy, aby wziąć udział w naradzie.</p
	><button
		onclick={props.onClose}
		type="button">Rozumiem</button
	></dialog>

<style lang="scss">
	dialog {
		background: var(--color-surface);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-raised);
		color: var(--color-text);
		margin: auto;
		padding: 1.5rem;
		width: min(24rem, 90vw);
	}
	dialog::backdrop {
		background: rgb(0 0 0 / 0.6);
	}
	h2 {
		margin: 0 0 1rem;
	}
	p {
		margin: 0 0 1rem;
	}
	button {
		background: var(--color-accent);
		border: none;
		border-radius: var(--radius-md);
		color: rgb(255 255 255);
		cursor: pointer;
		font-size: 1rem;
		padding: 0.5rem 1rem;
	}
</style>
