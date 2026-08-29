<script lang="ts">
	import {resolve} from "$app/paths";
	import type {client_} from "../../client/module.ts";
	import type {PageProps} from "./$types.d.ts";
	const props: PageProps = $props();

	const namesOfAttitudes = {friendly: `Przyjazny`, hostile: `Wrogi`} as const;
	const namesOfRoles = {
		captain: `Kapitan`,
		guard: `Strażnik`,
		planner: `Planista`,
		worker: `Pracownik`,
	} as const;
	const namesOfSkills = {
		escapist: `Uciekinier`,
		medium: `Medium`,
		trustworthy: `Godny zaufania`,
	} as const;

	function namesOfRolesOfPlayer(
		player: client_.core_.snapshotOfGame_.snapshotOfFullPlayer_.Snapshot,
	): string {
		const names: string[] = [];
		if (player.roles?.captain ?? false) {
			names.push(namesOfRoles.captain);
		}
		if (player.roles?.guard ?? false) {
			names.push(namesOfRoles.guard);
		}
		if (player.roles?.planner ?? false) {
			names.push(namesOfRoles.planner);
		}
		if (player.roles?.worker ?? false) {
			names.push(namesOfRoles.worker);
		}
		return names.join(`, `);
	}
	function namesOfSkillsOfPlayer(
		player: client_.core_.snapshotOfGame_.snapshotOfFullPlayer_.Snapshot,
	): string {
		const names: string[] = [];
		if (player.skills?.escapist ?? false) {
			names.push(namesOfSkills.escapist);
		}
		if (player.skills?.medium ?? false) {
			names.push(namesOfSkills.medium);
		}
		if (player.skills?.trustworthy ?? false) {
			names.push(namesOfSkills.trustworthy);
		}
		return names.length === 0 ? `brak` : names.join(`, `);
	}
	function nameOfStateOfPlayer(
		player: client_.core_.snapshotOfGame_.snapshotOfFullPlayer_.Snapshot,
	): string {
		if (player.imprisonment === `imprisoned`) {
			return `W więzieniu`;
		} else if (player.stateOfDeath === `alive`) {
			return `Żywy`;
		} else {
			return `Martwy`;
		}
	}
</script>

<section
	><h2>Zarządzanie grą</h2><form
		action={resolve(`/admin/reset-game`)}
		method="POST"><button type="submit">Restartuj grę</button></form
	><form
		action={resolve(`/admin/set-tasks-per-player`)}
		method="POST"
		><label
			>Liczba zadań na gracza<input
				min="1"
				name="numberOfTasks"
				type="number"
				value={props.data.numberOfTasksPerPlayer} /></label
		><button type="submit">Zapisz</button></form
	><form
		action={resolve(`/admin/set-percentage-of-hostile`)}
		method="POST"
		><label
			>Procent wrogów<input
				max="100"
				min="0"
				name="percentage"
				type="number"
				value={props.data.percentageOfHostile} /></label
		><button type="submit">Zapisz</button></form
	><h3>Lokalizacje</h3><ul
		>{#each props.data.locations as location (location.id)}<li
				><span>{location.name}</span><form
					action={resolve(`/admin/remove-location`)}
					method="POST"
					><input
						name="idOfLocation"
						type="hidden"
						value={location.id} /><button type="submit">Usuń</button></form
				></li
			>{/each}</ul
	><form
		action={resolve(`/admin/add-location`)}
		method="POST"
		><label
			>Nowa lokalizacja<input
				name="name"
				required
				type="text" /></label
		><button type="submit">Dodaj</button></form
	><h3>Kto jest kim</h3><ul
		>{#each props.data.players as player (player.id)}<li
				><img
					alt=""
					src={player.urlOfPhoto} /><div
					><strong>{player.name}</strong><p
						>Rola: {namesOfRolesOfPlayer(player)}</p
					><p>Nastawienie: {namesOfAttitudes[player.attitude ?? `friendly`]}</p
					><p>Umiejętności: {namesOfSkillsOfPlayer(player)}</p><p
						>Status: {nameOfStateOfPlayer(player)}</p
					><form
						action={resolve(`/admin/set-player-skills`)}
						method="POST"
						><input
							name="idOfPlayer"
							type="hidden"
							value={player.id} /><label
							><input
								name="escapist"
								type="hidden"
								value="false" /><input
								checked={player.skills?.escapist ?? false}
								name="escapist"
								type="checkbox"
								value="true" />Uciekinier</label
						><label
							><input
								name="medium"
								type="hidden"
								value="false" /><input
								checked={player.skills?.medium ?? false}
								name="medium"
								type="checkbox"
								value="true" />Medium</label
						><label
							><input
								name="trustworthy"
								type="hidden"
								value="false" /><input
								checked={player.skills?.trustworthy ?? false}
								name="trustworthy"
								type="checkbox"
								value="true" />Godny zaufania</label
						><button type="submit">Zapisz umiejętności</button></form
					><form
						action={resolve(`/admin/set-player-attitude`)}
						method="POST"
						><input
							name="idOfPlayer"
							type="hidden"
							value={player.id} /><select name="attitude"
							><option
								selected={player.attitude === `friendly`}
								value="friendly">Przyjazny</option
							><option
								selected={player.attitude === `hostile`}
								value="hostile">Wrogi</option
							></select
						><button type="submit">Zapisz nastawienie</button></form
					></div
				></li
			>{/each}</ul
	></section>

<style lang="scss">
	section {
		background: var(--color-surface);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-lg);
		display: block flex;
		flex-direction: column;
		gap: 1rem;
		margin: 2rem auto;
		max-width: 28rem;
		padding: 1.5rem;
		width: calc(100% - 2rem);
	}
	form {
		align-items: flex-end;
		display: block flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	form label {
		flex-grow: 1;
	}
	h3 {
		margin-top: 0.5rem;
	}
	ul {
		display: block flex;
		flex-direction: column;
		gap: 1rem;
	}
	li {
		align-items: flex-start;
		background: var(--color-surface-2);
		border: 0.0625rem solid var(--color-border);
		border-radius: var(--radius-md);
		display: block flex;
		gap: 0.75rem;
		padding: 0.75rem;
	}
	li img {
		border-radius: 50%;
		height: 2.5rem;
		width: 2.5rem;
	}
	li > div {
		display: block flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	li > div > form {
		align-items: center;
	}
	li > div > form label {
		align-items: center;
		flex-direction: row;
		font-size: 0.875rem;
		gap: 0.25rem;
	}
	ul:nth-of-type(1) {
		gap: 0.5rem;
	}
	ul:nth-of-type(1) li {
		align-items: center;
		justify-content: space-between;
	}
</style>
