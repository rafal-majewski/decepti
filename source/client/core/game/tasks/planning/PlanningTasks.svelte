<script lang="ts">
	import {resolve} from "$app/paths";
	import type {snapshotOfGame_} from "../../../snapshot-of-game/module.ts";

	type Connection = {
		readonly idOfPlayer: string;
		readonly idOfTask: string;
		readonly midY: number;
		readonly yOfPlayer: number;
		readonly yOfTask: number;
	};

	const props: {
		readonly assignments: readonly snapshotOfGame_.snapshotOfAssignment_.Snapshot[];
		readonly idOfGame: string;
		readonly idOfPendingPlayer: null | string;
		readonly idOfPendingTask: null | string;
		readonly indexOfPendingSlot: null | number;
		readonly numberOfRemainingTasks: number;
		readonly tasks: null | readonly snapshotOfGame_.snapshotOfTask_.Snapshot[];
	} = $props();

	const canvasWidth: number = 96;
	const rowHeight: number = 48;

	const tasks: readonly snapshotOfGame_.snapshotOfTask_.Snapshot[] = $derived(
		props.tasks ?? [],
	);
	const isConnecting: boolean = $derived(
		props.idOfPendingTask !== null || props.idOfPendingPlayer !== null,
	);

	function idOfPlayerOfTask(idOfTask: string): string | undefined {
		for (const assignment of props.assignments) {
			for (const taskInSlot of assignment.tasks) {
				if (taskInSlot !== null && taskInSlot.id === idOfTask) {
					return assignment.idOfPlayer;
				}
			}
		}
		return undefined;
	}
	const connections: readonly Connection[] = $derived.by(
		function computeConnections(): Connection[] {
			const list: Connection[] = [];
			props.assignments.forEach(function collectConnections(
				assignment: snapshotOfGame_.snapshotOfAssignment_.Snapshot,
				indexOfPlayer: number,
			): void {
				assignment.tasks.forEach(function collectFromSlot(
					taskInSlot: null | snapshotOfGame_.snapshotOfTask_.Snapshot,
					indexOfSlot: number,
				): void {
					if (taskInSlot === null) {
						return;
					}
					const indexOfTask: number = tasks.findIndex(function findIndexOfTask(
						task: snapshotOfGame_.snapshotOfTask_.Snapshot,
					): boolean {
						return task.id === taskInSlot.id;
					});
					if (indexOfTask === -1) {
						return;
					}
					const yOfTask: number = indexOfTask * rowHeight + rowHeight / 2;
					const yOfSlot: number =
						(indexOfPlayer * 2 + indexOfSlot) * rowHeight + rowHeight / 2;
					list.push({
						idOfPlayer: assignment.idOfPlayer,
						idOfTask: taskInSlot.id,
						midY: (yOfTask + yOfSlot) / 2,
						yOfPlayer: yOfSlot,
						yOfTask: yOfTask,
					});
				});
			});
			return list;
		},
	);
	const heightOfBoard: number = $derived(
		Math.max(tasks.length, props.assignments.length * 2) * rowHeight,
	);
</script>

<section
	>{#if isConnecting}<form
			action={resolve(`/game/${props.idOfGame}/cancel-connect`)}
			method="POST"><button type="submit">Anuluj</button></form
		>{/if}<p>Pozostało zadań: <strong>{props.numberOfRemainingTasks}</strong></p
	><div
		><ul
			>{#each tasks as task (task.id)}{#if idOfPlayerOfTask(task.id) !== undefined}<li
						><span>{task.nameOfLocation}</span></li
					>{:else}<li
						><span>{task.nameOfLocation}</span
						>{#if props.idOfPendingPlayer !== null}<form
								action={resolve(`/game/${props.idOfGame}/connect`)}
								method="POST"
								><input
									name="idOfPlayer"
									type="hidden"
									value={props.idOfPendingPlayer} /><input
									name="indexOfSlot"
									type="hidden"
									value={props.indexOfPendingSlot} /><input
									name="idOfTask"
									type="hidden"
									value={task.id} /><button type="submit">+</button></form
							>{:else if props.idOfPendingTask !== null}<button
								disabled
								type="button">+</button
							>{:else}<form
								action={resolve(`/game/${props.idOfGame}/begin-connect-task`)}
								method="POST"
								><input
									name="idOfTask"
									type="hidden"
									value={task.id} /><button type="submit">+</button></form
							>{/if}</li
					>{/if}{/each}</ul
		><svg
			height={heightOfBoard}
			width={canvasWidth}
			>{#each connections as connection (connection.idOfTask)}<line
					x1="0"
					x2={canvasWidth}
					y1={connection.yOfTask}
					y2={connection.yOfPlayer} /><foreignObject
					height="32"
					width="32"
					x={canvasWidth / 2 - 16}
					y={connection.midY - 16}
					><form
						action={resolve(`/game/${props.idOfGame}/disconnect-task`)}
						method="POST"
						><input
							name="idOfTask"
							type="hidden"
							value={connection.idOfTask} /><button
							disabled={isConnecting}
							type="submit">✕</button
						></form
					></foreignObject
				>{/each}</svg
		><ul
			>{#each props.assignments as assignment (assignment.idOfPlayer)}
				{#each assignment.tasks as taskInSlot, indexOfSlot (indexOfSlot)}
					<li
						>{#if taskInSlot !== null}<strong
								>{taskInSlot.nameOfLocation}</strong
							>{:else if props.idOfPendingTask !== null}<form
								action={resolve(`/game/${props.idOfGame}/connect`)}
								method="POST"
								><input
									name="idOfPlayer"
									type="hidden"
									value={assignment.idOfPlayer} /><input
									name="idOfTask"
									type="hidden"
									value={props.idOfPendingTask} /><input
									name="indexOfSlot"
									type="hidden"
									value={indexOfSlot} /><button type="submit">+</button></form
							>{:else if props.idOfPendingPlayer !== null}<button
								disabled
								type="button">+</button
							>{:else}<form
								action={resolve(`/game/${props.idOfGame}/begin-connect-player`)}
								method="POST"
								><input
									name="idOfPlayer"
									type="hidden"
									value={assignment.idOfPlayer} /><input
									name="indexOfSlot"
									type="hidden"
									value={indexOfSlot} /><button type="submit">+</button></form
							>{/if}{#if indexOfSlot === 0}<span>{assignment.nameOfPlayer}</span
							>{/if}</li>
				{/each}
			{/each}</ul
		></div
	></section>

<style lang="scss">
	section {
		display: block flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	div {
		display: block grid;
		grid-template-columns: minmax(8rem, 1fr) auto minmax(8rem, 1fr);
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		align-items: center;
		display: block flex;
		gap: 0.5rem;
		height: 3rem;
	}
	div > ul:last-child li:nth-child(odd) {
		border-top: 0.0625rem solid var(--color-border);
	}
	span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	strong {
		align-items: center;
		background: var(--color-accent);
		border-radius: var(--radius-sm);
		color: rgb(255 255 255);
		display: block flex;
		font-size: 0.75rem;
		font-weight: 400;
		height: 1.75rem;
		padding: 0 0.5rem;
	}
	svg {
		display: block flow;
	}
	line {
		stroke: var(--color-text-muted);
		stroke-width: 2;
	}
	li button {
		background: var(--color-surface-3);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-text);
		cursor: pointer;
		height: 1.75rem;
		width: 1.75rem;
	}
	foreignObject button {
		background: var(--color-danger);
		border: none;
		border-radius: 50%;
		color: rgb(255 255 255);
		cursor: pointer;
		height: 2rem;
		width: 2rem;
	}
	section > form button {
		background: var(--color-accent);
		border: none;
		border-radius: var(--radius-sm);
		color: rgb(255 255 255);
		cursor: pointer;
		padding: 0.4rem 0.8rem;
	}
	li button:disabled {
		cursor: default;
		opacity: 0.4;
	}
	foreignObject button:disabled {
		cursor: default;
		opacity: 0.4;
	}
</style>
