<script lang="ts">
	import type {snapshotOfGame_} from "../../snapshot-of-game/module.ts";
	const props: {
		readonly tasks: readonly snapshotOfGame_.snapshotOfTask_.Snapshot[];
	} = $props();
</script>

<ul
	>{#each props.tasks as task (task.id)}<li>{task.nameOfLocation}</li
		>{/each}{#if props.tasks.length === 0}<li>Brak zadań</li>{/if}</ul>

<style lang="scss">
	ul {
		list-style: none;
		margin: 0 0 1rem;
		padding: 0;
	}
	li {
		margin: 0.25rem 0;
	}
</style>
