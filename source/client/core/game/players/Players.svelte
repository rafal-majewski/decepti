<script lang="ts">
	import type {snapshotOfGame_} from "../../snapshot-of-game/module.ts";
	import {listOfPlayers_} from "./list-of-players/module.ts";
	const props: {
		readonly players: readonly snapshotOfGame_.snapshotOfPlayer_.Snapshot[];
	} = $props();
</script>

<aside
	><h2>Gracze</h2><listOfPlayers_.List players={props.players}
	></listOfPlayers_.List
	></aside>

<style lang="scss">
	aside {
		background-color: rgb(47 49 54);
		border-right: 0.0625rem solid rgb(32 34 37);
		display: block flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		width: 16rem;
	}
	h2 {
		font-size: 1.25rem;
		margin: 0;
	}
</style>
