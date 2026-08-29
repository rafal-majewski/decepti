<script lang="ts">
	import type {snapshotOfGame_} from "../../snapshot-of-game/module.ts";
	const props: {
		readonly currentPlayer: snapshotOfGame_.snapshotOfCurrentPlayer_.Snapshot;
	} = $props();
	const namesOfFellowHostiles: string = $derived(
		(props.currentPlayer.fellowHostiles ?? [])
			.map(function nameOfHostile(
				hostile: snapshotOfGame_.snapshotOfCurrentPlayer_.snapshotOfOption_.Snapshot,
			): string {
				return hostile.name;
			})
			.join(`, `),
	);
</script>

<section
	><h2>Kim jesteś?</h2><dl
		>{#if props.currentPlayer.nameOfRole !== null}<dt>Rola</dt><dd
				>{props.currentPlayer.nameOfRole}</dd
			>{/if}{#if props.currentPlayer.nameOfAttitude !== null}<dt>Nastawienie</dt
			><dd>{props.currentPlayer.nameOfAttitude}</dd
			>{/if}{#if props.currentPlayer.nameOfSkills !== null}<dt>Umiejętności</dt
			><dd>{props.currentPlayer.nameOfSkills}</dd
			>{/if}{#if props.currentPlayer.fellowHostiles !== null && props.currentPlayer.fellowHostiles.length > 0}<dt
				>Inni wrodzy</dt
			><dd>{namesOfFellowHostiles}</dd
			>{/if}{#if props.currentPlayer.isKnownToBeInJail}<dt>Status</dt><dd
				>Jesteś w więzieniu</dd
			>{/if}</dl
	></section>

<style lang="scss">
	section {
		background: var(--color-surface);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-text);
		display: block flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem;
	}
	h2 {
		color: var(--color-text-muted);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	dl {
		display: block grid;
		gap: 0.5rem 1rem;
		grid-template-columns: max-content 1fr;
		margin: 0;
	}
	dt {
		color: var(--color-text-muted);
	}
	dd {
		color: var(--color-text);
		font-weight: 600;
		margin: 0;
	}
</style>
