<script lang="ts">
	const props: {readonly countOfPlayers: number} = $props();
</script>

<p>Liczba graczy: {props.countOfPlayers}</p>

<style lang="scss">
	p {
		color: var(--color-text-muted);
	}
</style>
