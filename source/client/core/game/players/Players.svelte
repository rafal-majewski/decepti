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
		background: var(--color-surface);
		border-right: 0.0625rem solid var(--color-border);
		display: block flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
		padding: 1rem;
	}
	h2 {
		color: var(--color-text-muted);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
</style>
