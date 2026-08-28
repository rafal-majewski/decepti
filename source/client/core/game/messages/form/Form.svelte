<script lang="ts">
	import {resolve} from "$app/paths";
	const props: {readonly idOfGame: string} = $props();
</script>

<form
	action={resolve(`/game/${props.idOfGame}/send-message`)}
	method="POST"
	><input
		name="text"
		placeholder="Napisz wiadomość…"
		required
		type="text" /><button type="submit">Wyślij</button></form>

<style lang="scss">
	form {
		align-items: center;
		display: block flex;
		gap: 0.75rem;
		padding: 1rem;
	}
	input {
		background-color: rgb(64 68 75);
		border: 0;
		border-radius: 0.375rem;
		color: rgb(220 221 222);
		flex-grow: 1;
		padding: 0.75rem;
	}
	button {
		background-color: rgb(88 101 242);
		border: 0;
		border-radius: 0.375rem;
		color: rgb(255 255 255);
		font-weight: 600;
		padding: 0.75rem 1rem;
	}
</style>
