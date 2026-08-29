<script lang="ts">
	import {resolve} from "$app/paths";
	import type {snapshotOfGame_} from "../../../snapshot-of-game/module.ts";
	import {tasks_} from "../../tasks/module.ts";
	const props: {
		readonly game: snapshotOfGame_.Snapshot;
		readonly idOfGame: string;
	} = $props();
</script>

<section
	>{#if props.game.currentPlayer.isPlanner}<h2>Kontynuować grę?</h2
		><tasks_.planning_.PlanningTasks
			assignments={props.game.currentPlayer.assignments}
			idOfGame={props.idOfGame}
			idOfPendingPlayer={props.game.currentPlayer.idOfPendingPlayer}
			idOfPendingTask={props.game.currentPlayer.idOfPendingTask}
			indexOfPendingSlot={props.game.currentPlayer.indexOfPendingSlot}
			numberOfRemainingTasks={props.game.numberOfRemainingTasks}
			tasks={props.game.tasks}></tasks_.planning_.PlanningTasks
		><form
			action={resolve(`/game/${props.idOfGame}/continue-from-planning`)}
			method="POST"
			><button
				name="choice"
				type="submit"
				value="tak">Tak</button
			><button
				name="choice"
				type="submit"
				value="nie">Nie</button
			></form
		>{:else}<tasks_.Tasks tasks={props.game.currentPlayer.tasks}></tasks_.Tasks
		><p>Oczekiwanie na decyzję planisty…</p>{/if}</section>

<style lang="scss"></style>
