<script lang="ts">
	import type {snapshotOfGame_} from "../../snapshot-of-game/module.ts";
	import {form_} from "./form/module.ts";
	import {listOfMessages_} from "./list-of-messages/module.ts";
	const props: {
		readonly idOfGame: string;
		readonly messages: readonly snapshotOfGame_.snapshotOfMessage_.Snapshot[];
	} = $props();
</script>

<section
	><h2>Wiadomości</h2><listOfMessages_.List messages={props.messages}
	></listOfMessages_.List
	><form_.Form idOfGame={props.idOfGame}></form_.Form></section>

<style lang="scss">
	section {
		background: var(--color-bg-2);
		display: block flex;
		flex-direction: column;
		flex-grow: 1;
		min-height: 0;
	}
	h2 {
		border-bottom: 0.0625rem solid var(--color-border);
		color: var(--color-text-muted);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		padding: 1rem;
		text-transform: uppercase;
	}
</style>
