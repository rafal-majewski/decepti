<script lang="ts">
	import type {snapshotOfGame_} from "../../../snapshot-of-game/module.ts";
	import {minigame_} from "../minigame/module.ts";
	const props: {
		readonly currentPlayer: snapshotOfGame_.snapshotOfCurrentPlayer_.Snapshot;
		readonly idOfGame: string;
		readonly locations: readonly snapshotOfGame_.snapshotOfLocation_.Snapshot[];
	} = $props();
	function taskAt(
		idOfLocation: string,
	): snapshotOfGame_.snapshotOfTask_.Snapshot | undefined {
		return props.currentPlayer.tasks.find(function findTaskAtLocation(
			task: snapshotOfGame_.snapshotOfTask_.Snapshot,
		): boolean {
			return task.idOfLocation === idOfLocation;
		});
	}
	let activeTask: snapshotOfGame_.snapshotOfTask_.Snapshot | undefined =
		$state();
	function startAt(
		location: snapshotOfGame_.snapshotOfLocation_.Snapshot,
	): void {
		const task: snapshotOfGame_.snapshotOfTask_.Snapshot | undefined = taskAt(
			location.id,
		);
		if (task !== undefined) {
			activeTask = task;
		} else {
			/* empty */
		}
	}
	function closeMinigame(): void {
		activeTask = undefined;
	}
</script>

<section
	>{#if props.currentPlayer.tasks.length > 0}<p
			>Twoje zadania: <strong
				>{props.currentPlayer.tasks
					.map(function nameOfTask(
						task: snapshotOfGame_.snapshotOfTask_.Snapshot,
					): string {
						return task.nameOfLocation;
					})
					.join(`, `)}</strong
			></p
		>{:else}<p>Nie masz już zadań w tej rundzie.</p>{/if}<ul
		>{#each props.locations as location (location.id)}<li
				><button
					disabled={taskAt(location.id) === undefined}
					onclick={function handleStartAt(): void {
						startAt(location);
					}}
					type="button">{location.name}</button
				></li
			>{/each}</ul
	></section>

{#if activeTask !== undefined}<div
		><minigame_.Minigame
			idOfGame={props.idOfGame}
			idOfTask={activeTask.id}
			locationId={activeTask.idOfLocation}
			locationName={activeTask.nameOfLocation}
			onClose={closeMinigame}></minigame_.Minigame
		></div
	>{/if}

<style lang="scss">
	ul {
		display: block flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style-type: none;
		margin: 0 0 0.5rem;
		padding: 0;
	}
	button {
		background: var(--color-surface-3);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-md);
		color: var(--color-text);
		cursor: pointer;
		padding: 0.5rem 0.75rem;
	}
	button:disabled {
		cursor: default;
		opacity: 0.45;
	}
	div {
		left: 50%;
		position: fixed;
		top: 1rem;
		transform: translateX(-50%);
		z-index: 100;
	}
</style>
