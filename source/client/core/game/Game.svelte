<script lang="ts">
	import type {snapshotOfGame_} from "../snapshot-of-game/module.ts";
	import {manager_} from "./manager/module.ts";
	import {messages_} from "./messages/module.ts";
	import {players_} from "./players/module.ts";
	const props: {readonly game: snapshotOfGame_.Snapshot} = $props();
	let game: snapshotOfGame_.Snapshot = $derived<snapshotOfGame_.Snapshot>(
		props.game,
	);
	$effect(function subscribeToEvents(): () => void {
		const manager: manager_.Manager = manager_.Manager.create(
			props.game.id,
			function handleGameUpdated(updatedGame: snapshotOfGame_.Snapshot): void {
				game = updatedGame;
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
	><players_.Players players={game.players}></players_.Players
	><messages_.Messages
		idOfGame={game.id}
		messages={game.messages}></messages_.Messages
	></div>

<style lang="scss">
	div {
		display: block flex;
		height: 100vh;
	}
</style>
