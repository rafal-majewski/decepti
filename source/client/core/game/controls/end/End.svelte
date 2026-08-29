<script lang="ts">
	import type {snapshotOfGame_} from "../../../snapshot-of-game/module.ts";
	const props: {
		readonly winners: null | snapshotOfGame_.snapshotOfWinners_.Snapshot;
	} = $props();
</script>

{#if props.winners !== null}<section
		><h2>{props.winners.attitude}</h2><ul
			>{#each props.winners.players as player (player.id)}<li
					>{player.person.name}</li
				>{/each}</ul
		></section
	>{/if}

<style lang="scss"></style>
