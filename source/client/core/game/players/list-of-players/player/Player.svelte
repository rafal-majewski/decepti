<script lang="ts">
	import type {snapshotOfGame_} from "../../../../snapshot-of-game/module.ts";
	const props: {readonly player: snapshotOfGame_.snapshotOfPlayer_.Snapshot} =
		$props();
</script>

<li
	><img
		alt=""
		src={props.player.urlOfPhoto} /><span>{props.player.name}</span></li>

<style lang="scss">
	li {
		align-items: center;
		display: block flex;
		gap: 0.75rem;
	}
	img {
		border-radius: 50%;
		height: 2.5rem;
		width: 2.5rem;
	}
	span {
		color: rgb(220 221 222);
		font-size: 1rem;
	}
</style>
