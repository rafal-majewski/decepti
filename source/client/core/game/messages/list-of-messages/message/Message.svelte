<script lang="ts">
	import type {snapshotOfGame_} from "../../../../snapshot-of-game/module.ts";
	import {formattingTimestamp_} from "./formatting-timestamp/module.ts";
	const props: {readonly message: snapshotOfGame_.snapshotOfMessage_.Snapshot} =
		$props();
</script>

<li
	><img
		alt=""
		src={props.message.author.urlOfPhoto} /><div
		><header
			><span>{props.message.author.name}</span><time
				datetime={props.message.timestamp.toISOString()}
				>{formattingTimestamp_.format(props.message.timestamp)}</time
			></header
		><p>{props.message.text}</p></div
	></li>

<style lang="scss">
	li {
		align-items: flex-start;
		display: block flex;
		gap: 1rem;
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
	}
	header {
		align-items: baseline;
		display: block flex;
		gap: 0.5rem;
	}
	span {
		color: rgb(220 221 222);
		font-weight: 600;
	}
	time {
		color: rgb(142 146 151);
		font-size: 0.75rem;
	}
	p {
		color: rgb(220 221 222);
		margin: 0;
	}
</style>
