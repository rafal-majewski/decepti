<script lang="ts">
	import {resolve} from "$app/paths";
	import type {snapshotOfGame_} from "../../../snapshot-of-game/module.ts";
	import {tasks_} from "../../tasks/module.ts";
	const props: {
		readonly currentPlayer: snapshotOfGame_.snapshotOfCurrentPlayer_.Snapshot;
		readonly idOfGame: string;
		readonly locations: readonly snapshotOfGame_.snapshotOfLocation_.Snapshot[];
	} = $props();
</script>

<section
	>{#if props.currentPlayer.isKnownToBeDead}<p>Nie żyjesz.</p
		>{:else if props.currentPlayer.isKnownToBeInJail}<p>Jesteś w więzieniu.</p
		>{#if props.currentPlayer.canEscape}<form
				action={resolve(`/game/${props.idOfGame}/escape-from-jail`)}
				method="POST"><button type="submit">Ucieknij</button></form
			>{/if}{:else if props.currentPlayer.hasArrivedToBase}<p
			>Jesteś w bazie. Czekaj na pozostałych.</p
		>{:else}{#if props.currentPlayer.tasks.length === 0}<p
				>Skończyłeś swoje zadania. Wróć do bazy.</p
			><form
				action={resolve(`/game/${props.idOfGame}/arrive-at-base`)}
				method="POST"><button type="submit">Dotarłem do bazy</button></form
			>{:else}<tasks_.Tasks tasks={props.currentPlayer.tasks}></tasks_.Tasks
			><tasks_.locations_.Locations
				currentPlayer={props.currentPlayer}
				idOfGame={props.idOfGame}
				locations={props.locations}></tasks_.locations_.Locations
			>{/if}<form
			action={resolve(`/game/${props.idOfGame}/call-meeting`)}
			method="POST"
			><button type="submit">Widzę trupa — zwołuję spotkanie</button></form
		><form
			action={resolve(`/game/${props.idOfGame}/report-death`)}
			method="POST"><button type="submit">Zabito mnie</button></form
		>{/if}</section>

<style lang="scss"></style>
