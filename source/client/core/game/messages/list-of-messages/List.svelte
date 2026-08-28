<script lang="ts">
	import type {snapshotOfGame_} from "../../../snapshot-of-game/module.ts";
	import {message_} from "./message/module.ts";
	const props: {
		readonly messages: readonly snapshotOfGame_.snapshotOfMessage_.Snapshot[];
	} = $props();
</script>

<ol
	>{#each props.messages as message (message.id)}<message_.Message
			message={message}></message_.Message
		>{/each}</ol>

<style lang="scss">
	ol {
		display: block flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 1rem;
		list-style-type: none;
		margin: 0;
		overflow-y: auto;
		padding: 1rem;
	}
</style>
