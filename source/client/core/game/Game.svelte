<script lang="ts">
	import type {snapshotOfGame_} from "../snapshot-of-game/module.ts";
	import {manager_} from "./manager/module.ts";
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
	><section
		><h2>Gracze</h2><ul
			>{#each game.players as player (player.id)}<li
					><img
						alt=""
						src={player.urlOfPhoto} /><span>{player.name}</span></li
				>{/each}</ul
		></section
	></div>

<style lang="scss"></style>
