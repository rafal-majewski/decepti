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
	let dialog: HTMLDialogElement | undefined = $state();
	let isDismissed: boolean = $state(false);
	$effect(function openDialog(): void {
		const wasDismissed: boolean =
			localStorage.getItem(
				`decepti:reveal-role-dismissed:${props.currentPlayer.id}`,
			) === `true`;
		if (!isDismissed && !wasDismissed && dialog !== undefined && !dialog.open) {
			dialog.showModal();
		} else {
			/* empty */
		}
	});
	function dismiss(): void {
		isDismissed = true;
		localStorage.setItem(
			`decepti:reveal-role-dismissed:${props.currentPlayer.id}`,
			`true`,
		);
		return;
	}
</script>

{#if !isDismissed}<dialog
		bind:this={dialog}
		onclose={dismiss}
		><h2>Kim jesteś?</h2><dl
			>{#if props.currentPlayer.nameOfRole !== null}<dt>Rola</dt><dd
					>{props.currentPlayer.nameOfRole}</dd
				>{/if}{#if props.currentPlayer.nameOfAttitude !== null}<dt
					>Nastawienie</dt
				><dd>{props.currentPlayer.nameOfAttitude}</dd
				>{/if}{#if props.currentPlayer.nameOfSkills !== null}<dt
					>Umiejętności</dt
				><dd>{props.currentPlayer.nameOfSkills}</dd
				>{/if}{#if props.currentPlayer.fellowHostiles !== null && props.currentPlayer.fellowHostiles.length > 0}<dt
					>Inni wrodzy</dt
				><dd>{namesOfFellowHostiles}</dd>{/if}</dl
		><button
			onclick={dismiss}
			type="button">Rozumiem</button
		></dialog
	>{/if}

<style lang="scss">
	dialog {
		background: var(--color-surface);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-raised);
		color: var(--color-text);
		margin: auto;
		padding: 1.5rem;
		width: min(24rem, 90vw);
	}
	dialog::backdrop {
		background: rgb(0 0 0 / 0.6);
	}
	h2 {
		margin: 0 0 1rem;
	}
	dl {
		display: block grid;
		gap: 0.5rem 1rem;
		grid-template-columns: max-content 1fr;
		margin: 0 0 1rem;
	}
	dt {
		color: var(--color-text-muted);
	}
	dd {
		margin: 0;
	}
	button {
		background: var(--color-accent);
		border: none;
		border-radius: var(--radius-md);
		color: rgb(255 255 255);
		cursor: pointer;
		font-size: 1rem;
		padding: 0.5rem 1rem;
	}
</style>
