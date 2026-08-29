<script lang="ts">
	import type {snapshotOfGame_} from "../../snapshot-of-game/module.ts";
	import {discussing_} from "./discussing/module.ts";
	import {end_} from "./end/module.ts";
	import {lobby_} from "./lobby/module.ts";
	import {maintaining_} from "./maintaining/module.ts";
	import {planning_} from "./planning/module.ts";
	import {returning_} from "./returning/module.ts";
	const props: {readonly game: snapshotOfGame_.Snapshot} = $props();
</script>

<section
	><h2>{props.game.nameOfState}</h2
	>{#if props.game.state === `lobby`}<lobby_.Lobby
			idOfGame={props.game.id}
			wantsToStart={props.game.currentPlayer.wantsToStart}></lobby_.Lobby
		>{:else if props.game.state === `planning`}<planning_.Planning
			game={props.game}
			idOfGame={props.game.id}></planning_.Planning
		>{:else if props.game.state === `maintaining`}<maintaining_.Maintaining
			currentPlayer={props.game.currentPlayer}
			idOfGame={props.game.id}
			locations={props.game.locations}></maintaining_.Maintaining
		>{:else if props.game.state === `returning`}<returning_.Returning
			hasArrivedToBase={props.game.currentPlayer.hasArrivedToBase}
			idOfGame={props.game.id}
			isKnownToBeDead={props.game.currentPlayer.isKnownToBeDead}
			isKnownToBeInJail={props.game.currentPlayer.isKnownToBeInJail}
		></returning_.Returning
		>{:else if props.game.state === `discussing`}<discussing_.Discussing
			currentPlayer={props.game.currentPlayer}
			idOfGame={props.game.id}></discussing_.Discussing
		>{:else if props.game.state === `end`}<end_.End winners={props.game.winners}
		></end_.End
		>{/if}</section>

<style lang="scss">
	section {
		background: var(--color-surface);
		border-left: 0.0625rem solid var(--color-border);
		display: block flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
		overflow-y: auto;
		padding: 1rem;
	}
	h2 {
		color: var(--color-text-muted);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	@media (width <= 48rem) {
		section {
			border-left: none;
		}
	}
</style>
