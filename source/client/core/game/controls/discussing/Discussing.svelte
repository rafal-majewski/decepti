<script lang="ts">
	import {resolve} from "$app/paths";
	import type {snapshotOfGame_} from "../../../snapshot-of-game/module.ts";
	const props: {
		readonly currentPlayer: snapshotOfGame_.snapshotOfCurrentPlayer_.Snapshot;
		readonly idOfGame: string;
	} = $props();
</script>

<section
	>{#if props.currentPlayer.isKnownToBeDead}<p>Nie żyjesz.</p
		>{:else if props.currentPlayer.isKnownToBeInJail}<p
			>Jesteś w więzieniu. Nie możesz głosować.</p
		>{:else}<h2>Głosowanie</h2><ul
			>{#each props.currentPlayer.targets as target (target.id)}<li
					><span>{target.name}</span><form
						action={resolve(`/game/${props.idOfGame}/vote-to-expel`)}
						method="POST"
						><input
							name="targetId"
							type="hidden"
							value={target.id} /><button
							disabled={target.hasVotedToExecute}
							name="choice"
							type="submit"
							value="tak">Tak</button
						><button
							disabled={!target.hasVotedToExecute}
							name="choice"
							type="submit"
							value="nie">Nie</button
						></form
					></li
				>{/each}</ul
		><p>Twoja gotowość: {props.currentPlayer.isDoneVoting ? `✅` : `❌`}</p
		><form
			action={resolve(`/game/${props.idOfGame}/finish-voting`)}
			method="POST"
			><button
				name="choice"
				type="submit"
				value={props.currentPlayer.isDoneVoting ? `nie` : `tak`}
				>{props.currentPlayer.isDoneVoting ?
					`Wycofaj gotowość`
				:	`Wyraź gotowość`}</button
			></form
		>{#if props.currentPlayer.isCaptain && !props.currentPlayer.hasAlivePlanner}<form
				action={resolve(`/game/${props.idOfGame}/assign-planner`)}
				method="POST"
				><select name="idOfTargetedUser"
					>{#each props.currentPlayer.plannerCandidates as candidate (candidate.id)}<option
							value={candidate.id}>{candidate.name}</option
						>{/each}</select
				><button type="submit">Wyznacz planistę</button></form
			>{/if}{#if props.currentPlayer.canSummon && props.currentPlayer.summonableDead.length > 0}<form
				action={resolve(`/game/${props.idOfGame}/summon-ghost`)}
				method="POST"
				><select name="targetId"
					>{#each props.currentPlayer.summonableDead as deadPlayer (deadPlayer.id)}<option
							value={deadPlayer.id}>{deadPlayer.name}</option
						>{/each}</select
				><button type="submit">Przywołaj ducha</button></form
			>{/if}{/if}</section>

<style lang="scss">
	ul {
		display: block flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	li {
		align-items: center;
		background: var(--color-surface-2);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-md);
		display: block flex;
		gap: 0.5rem;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
	}
	li span {
		font-weight: 600;
	}
	form {
		display: block flex;
		gap: 0.375rem;
	}
	form button {
		padding: 0.375rem 0.75rem;
	}
</style>
