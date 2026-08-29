<script lang="ts">
	import {enhance} from "$app/forms";
	import {resolve} from "$app/paths";
	const props: {readonly idOfGame: string} = $props();
</script>

<form
	action={resolve(`/game/${props.idOfGame}/send-message`)}
	method="POST"
	use:enhance
	><input
		name="text"
		placeholder="Napisz wiadomość…"
		required
		type="text" /><button type="submit">Wyślij</button></form>

<style lang="scss">
	form {
		align-items: center;
		border-top: 0.0625rem solid var(--color-border);
		display: block flex;
		gap: 0.75rem;
		padding: 0.75rem;
	}
	input {
		background: var(--color-surface-2);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-md);
		color: var(--color-text);
		flex-grow: 1;
		font-size: 1rem;
		padding: 0.75rem;
	}
	button {
		background: var(--color-accent);
		border: none;
		border-radius: var(--radius-md);
		color: rgb(255 255 255);
		font-size: 1rem;
		font-weight: 600;
		padding: 0.75rem 1rem;
	}
</style>
