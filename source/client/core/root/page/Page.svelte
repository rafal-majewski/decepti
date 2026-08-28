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

<div>
	<header>
		<h1>Decepti</h1>
		<counterOfPlayers_.CounterOfPlayers countOfPlayers={countOfPlayers}
		></counterOfPlayers_.CounterOfPlayers>
	</header>
	<section>
		<h2>Dołącz do rozgrywki</h2>
		<joiningGame_.Form></joiningGame_.Form>
	</section>
</div>

<style lang="scss"></style>
