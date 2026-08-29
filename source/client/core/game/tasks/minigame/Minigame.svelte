<script lang="ts">
	import {resolve} from "$app/paths";
	import {emojis_} from "./emojis/module.ts";

	type Emoji = {readonly emoji: string; readonly isTarget: boolean};
	type Status = `lost` | `playing` | `won`;
	type Variant = `find` | `tap`;

	const props: {
		readonly idOfGame: string;
		readonly idOfTask: string;
		readonly locationId: string;
		readonly locationName: string;
		readonly onClose: () => void;
	} = $props();

	const durationInSeconds: number = 18;
	const numberOfCells: number = 12;
	const targetNumberOfEmojis: number = 10;
	const variant: Variant = Math.random() < 0.5 ? `tap` : `find`;

	let cells: (Emoji | undefined)[] = $state(
		Array<Emoji | undefined>(numberOfCells).fill(undefined),
	);
	let form: HTMLFormElement | undefined = $state();
	let score: number = $state(0);
	let secondsLeft: number = $state(durationInSeconds);
	let status: Status = $state(`playing`);

	function randomThemedEmoji(): string {
		const themed: readonly string[] = emojis_.emojisOfLocations[
			props.locationId
		] ?? [`❓`];
		return themed[Math.floor(Math.random() * themed.length)] ?? `❓`;
	}
	function randomDistractorEmoji(): string {
		return (
			emojis_.distractorEmojis[
				Math.floor(Math.random() * emojis_.distractorEmojis.length)
			] ?? `❓`
		);
	}
	function spawnEmoji(): void {
		if (status !== `playing`) {
			return;
		} else {
			const indicesOfFreeCells: number[] = [];
			for (let index = 0; index < cells.length; index = index + 1) {
				if (cells[index] === undefined) {
					indicesOfFreeCells.push(index);
				} else {
					/* empty */
				}
			}
			if (indicesOfFreeCells.length === 0) {
				return;
			} else {
				const indexOfCell: number | undefined =
					indicesOfFreeCells[
						Math.floor(Math.random() * indicesOfFreeCells.length)
					];
				if (indexOfCell === undefined) {
					return;
				} else {
					const isTarget: boolean = variant === `tap` || Math.random() < 0.4;
					const emoji: string =
						isTarget ? randomThemedEmoji() : randomDistractorEmoji();
					const nextCells: (Emoji | undefined)[] = [...cells];
					nextCells[indexOfCell] = {emoji: emoji, isTarget: isTarget};
					cells = nextCells;
				}
			}
		}
	}
	function tapEmoji(indexOfCell: number): void {
		if (status !== `playing`) {
			return;
		} else {
			const cell: Emoji | undefined = cells[indexOfCell];
			if (cell === undefined) {
				return;
			} else {
				const nextCells: (Emoji | undefined)[] = [...cells];
				nextCells[indexOfCell] = undefined;
				cells = nextCells;
				if (cell.isTarget) {
					score = score + 1;
					if (score >= targetNumberOfEmojis) {
						status = `won`;
					} else {
						spawnEmoji();
					}
				} else {
					score = Math.max(0, score - 1);
					spawnEmoji();
				}
			}
		}
	}
	$effect(function runMinigame(): () => void {
		const timer: ReturnType<typeof setInterval> = setInterval(
			function tick(): void {
				if (status === `playing`) {
					secondsLeft = secondsLeft - 1;
					if (secondsLeft <= 0) {
						secondsLeft = 0;
						status = `lost`;
					}
				}
			},
			1000,
		);
		const spawner: ReturnType<typeof setInterval> = setInterval(
			function spawn(): void {
				if (status === `playing`) {
					spawnEmoji();
				}
			},
			500,
		);
		return function cleanup(): void {
			clearInterval(timer);
			clearInterval(spawner);
		};
	});
	$effect(function submitOnWin(): void {
		if (status === `won` && form !== undefined) {
			form.requestSubmit();
		}
	});
	function restart(): void {
		cells = Array<Emoji | undefined>(numberOfCells).fill(undefined);
		score = 0;
		secondsLeft = durationInSeconds;
		status = `playing`;
	}
</script>

<form
	action={resolve(`/game/${props.idOfGame}/complete-task`)}
	bind:this={form}
	method="POST"
	><input
		name="idOfTask"
		type="hidden"
		value={props.idOfTask} /></form
><section
	><h2>{props.locationName}</h2>{#if status === `playing`}<p
			>Klikaj emoji: <strong>{score}/{targetNumberOfEmojis}</strong></p
		><div
			>{#each cells as cell, indexOfCell (indexOfCell)}<button
					disabled={cell === undefined}
					onclick={function handleTapEmoji(): void {
						tapEmoji(indexOfCell);
					}}
					type="button">{cell?.emoji ?? ``}</button
				>{/each}</div
		><progress
			max={durationInSeconds}
			value={secondsLeft}></progress
		><button
			onclick={props.onClose}
			type="button">Anuluj</button
		>{:else if status === `won`}<p>Zadanie wykonane!</p>{:else}<p
			>Nie udało się. Spróbuj ponownie!</p
		><button
			onclick={restart}
			type="button">Spróbuj ponownie</button
		><button
			onclick={props.onClose}
			type="button">Zamknij</button
		>{/if}</section>

<style lang="scss">
	section {
		background: var(--color-surface);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-raised);
		color: var(--color-text);
		padding: 1rem;
		width: min(21rem, 94vw);
	}
	h2 {
		margin: 0 0 0.5rem;
	}
	p {
		margin: 0 0 0.75rem;
	}
	div {
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		display: block grid;
		gap: 0.5rem;
		grid-template-columns: repeat(4, 1fr);
		margin: 0 0 0.75rem;
		padding: 0.5rem;
	}
	progress {
		display: block flow;
		height: 0.75rem;
		margin: 0 0 0.75rem;
		width: 100%;
	}
	div button {
		background: var(--color-surface-3);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: 2.25rem;
		height: 3.5rem;
		line-height: 1;
		padding: 0;
	}
	section > button {
		background: var(--color-accent);
		border: none;
		border-radius: var(--radius-md);
		color: rgb(255 255 255);
		cursor: pointer;
		margin: 0 0.5rem 0.25rem 0;
		padding: 0.5rem 0.75rem;
	}
	div button:disabled {
		background: var(--color-surface-2);
		border-color: var(--color-border);
		cursor: default;
	}
</style>
