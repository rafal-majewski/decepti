<script lang="ts">
	import type {snapshotOfGame_} from "../../../../snapshot-of-game/module.ts";
	const roles = [
		{id: `captain`, name: `Kapitan`},
		{id: `guard`, name: `Strażnik`},
		{id: `planner`, name: `Planista`},
		{id: `worker`, name: `Pracownik`},
	] as const satisfies readonly {
		readonly id: keyof snapshotOfGame_.snapshotOfPlayer_.snapshotOfRole_.Snapshot;
		readonly name: string;
	}[];
	const props: {readonly player: snapshotOfGame_.snapshotOfPlayer_.Snapshot} =
		$props();
</script>

<li
	class:dead={props.player.isKnownToBeDead}
	><img
		alt=""
		src={props.player.person.urlOfPhoto} /><div
		><span>{props.player.person.name}</span
		>{#if props.player.isKnownToBeDead}<em>Nie żyje</em
			>{/if}{#if props.player.roles !== null}<div
				>{#each roles as role (role.id)}{#if props.player.roles[role.id]}<span
							class={role.id}>{role.name}</span
						>{/if}{/each}</div
			>{/if}</div
	></li>

<style lang="scss">
	li {
		align-items: center;
		display: block flex;
		gap: 0.75rem;
	}
	li.dead {
		opacity: 0.55;
	}
	li.dead img {
		filter: grayscale(1);
	}
	li.dead em {
		color: var(--color-danger);
		font-size: 0.75rem;
		font-style: normal;
		font-weight: 700;
	}
	img {
		border-radius: 50%;
		height: 2.5rem;
		width: 2.5rem;
	}
	li > div {
		display: block flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	li > div > div {
		display: block flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}
	li > div > span {
		color: var(--color-text);
		font-size: 1rem;
		font-weight: 600;
	}
	li > div > div > span {
		align-items: center;
		background: var(--color-surface-3);
		border-radius: 0.75rem;
		display: block flex;
		font-size: 0.75rem;
		gap: 0.25rem;
		padding: 0.125rem 0.5rem;
	}
	li > div > div > span::before {
		background: var(--color-text-muted);
		border-radius: 50%;
		content: "";
		height: 0.5rem;
		width: 0.5rem;
	}
	.captain {
		background: var(--color-accent-soft);
	}
	.captain::before {
		background: var(--color-accent);
	}
	.guard {
		background: rgb(235 69 158 / 0.15);
	}
	.guard::before {
		background: var(--color-pink);
	}
	.planner {
		background: rgb(250 166 26 / 0.15);
	}
	.planner::before {
		background: var(--color-warning);
	}
	.worker {
		background: rgb(59 165 93 / 0.15);
	}
	.worker::before {
		background: var(--color-success);
	}
</style>
