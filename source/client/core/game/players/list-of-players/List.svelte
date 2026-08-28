<script lang="ts">
	import type {snapshotOfGame_} from "../../../snapshot-of-game/module.ts";
	import {player_} from "./player/module.ts";
	const props: {
		readonly players: readonly snapshotOfGame_.snapshotOfPlayer_.Snapshot[];
	} = $props();
</script>

<ul
	>{#each props.players as player (player.id)}<player_.Player player={player}
		></player_.Player
		>{/each}</ul>

<style lang="scss">
	ul {
		display: block flex;
		flex-direction: column;
		gap: 0.5rem;
		list-style-type: none;
		margin: 0;
		overflow-y: auto;
		padding: 0;
	}
</style>
