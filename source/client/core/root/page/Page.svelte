<script lang="ts">
	import {counterOfPlayers_} from "../counter-of-players/module.ts";
	import {joiningGame_} from "../joining-game/module.ts";
	import {manager_} from "./manager/module.ts";
	const props: {readonly countOfPlayers: number} = $props();
	let countOfPlayers: number = $derived(props.countOfPlayers);
	$effect(function subscribeToEvents(): () => void {
		const manager: manager_.Manager = manager_.Manager.create(
			function handleCountOfPlayersUpdated(
				updatedCountOfPlayers: number,
			): void {
				countOfPlayers = updatedCountOfPlayers;
				return;
			},
		);
		return function unsubscribeFromEvents(): void {
			manager.destroy();
			return;
		};
	});
</script>

<div
	><header
		><h1>Decepti</h1><counterOfPlayers_.CounterOfPlayers
			countOfPlayers={countOfPlayers}></counterOfPlayers_.CounterOfPlayers
		></header
	><section
		><h2>Dołącz do rozgrywki</h2><joiningGame_.Form></joiningGame_.Form
		></section
	></div>

<style lang="scss">
	div {
		align-items: center;
		display: block flex;
		flex-direction: column;
		gap: 1.5rem;
		margin: 0 auto;
		max-width: 28rem;
		min-height: 100dvh;
		padding: 2rem 1rem;
	}
	header {
		display: block flex;
		flex-direction: column;
		gap: 0.25rem;
		text-align: center;
	}
	section {
		background: var(--color-surface);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-panel);
		display: block flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		width: 100%;
	}
	section h2 {
		font-size: 1.25rem;
	}
</style>
