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
		display: block flex;
		flex-direction: column;
		flex-grow: 1;
	}
	h2 {
		font-size: 1.25rem;
		margin: 0;
	}
</style>
