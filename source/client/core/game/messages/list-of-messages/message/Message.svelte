<script lang="ts">
	import type {snapshotOfGame_} from "../../../../snapshot-of-game/module.ts";
	import {formattingTimestamp_} from "./formatting-timestamp/module.ts";
	const props: {readonly message: snapshotOfGame_.snapshotOfMessage_.Snapshot} =
		$props();
</script>

<li
	><img
		alt=""
		src={props.message.author.person.urlOfPhoto} /><div
		><header
			><span>{props.message.author.person.name}</span><time
				datetime={props.message.timestamp.toISOString()}
				>{formattingTimestamp_.format(props.message.timestamp)}</time
			></header
		><p>{props.message.text}</p></div
	></li>

<style lang="scss">
	li {
		align-items: flex-start;
		display: block flex;
		gap: 0.75rem;
	}
	img {
		border-radius: 50%;
		height: 2.5rem;
		width: 2.5rem;
	}
	div {
		display: block flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 0;
	}
	header {
		align-items: baseline;
		display: block flex;
		gap: 0.5rem;
	}
	span {
		color: var(--color-text);
		font-weight: 700;
	}
	time {
		color: var(--color-text-muted);
		font-size: 0.75rem;
	}
	p {
		color: var(--color-text);
		margin: 0;
		overflow-wrap: anywhere;
	}
</style>
