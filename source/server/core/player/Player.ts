import type {client_} from "../../../client/module.ts";
import {generatingRandomId_} from "../../../generating-random-id/module.ts";
import type {attitude_} from "../attitude/module.ts";
import type {game_} from "../game/module.ts";
import type {gender_} from "../gender/module.ts";
import type {imprisonment_} from "../imprisonment/module.ts";
import {language} from "../language.ts";
import type {roles_} from "../roles/module.ts";
import type {skills_} from "../skills/module.ts";
import type {stateOfDeath_} from "../state-of-death/module.ts";
import type {task_} from "../task/module.ts";
import {person_} from "./person/module.ts";
export class Player {
	public static createNew(data: {
		readonly gender: gender_.Gender;
		readonly name: string;
		readonly photo: File;
	}): Player {
		const person: person_.Person = new person_.Person(
			data.gender,
			data.name,
			data.photo,
		);
		const player: Player = new Player(
			person,
			generatingRandomId_.generate(),
			`alive`,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			`free`,
			false,
			false,
			[null, null],
		);
		return player;
	}
	public constructor(
		person: person_.Person,
		id: string,
		stateOfDeath: null | stateOfDeath_.State,
		wantsToStart: boolean | null,
		hasArrivedToBase: boolean | null,
		isDoneVoting: boolean | null,
		votesToExpel: null | ReadonlySet<string>,
		attitude: attitude_.Attitude | null,
		roles: null | roles_.Roles,
		skills: null | skills_.Skills,
		imprisonment: imprisonment_.Imprisonment,
		hasUsedEscape: boolean | null,
		hasUsedSummon: boolean | null,
		tasks: readonly (null | task_.Task)[],
	) {
		this.person = person;
		this.id = id;
		this.stateOfDeath = stateOfDeath;
		this.wantsToStart = wantsToStart;
		this.hasArrivedToBase = hasArrivedToBase;
		this.isDoneVoting = isDoneVoting;
		this.votesToExpel = votesToExpel;
		this.attitude = attitude;
		this.roles = roles;
		this.skills = skills;
		this.imprisonment = imprisonment;
		this.hasUsedEscape = hasUsedEscape;
		this.hasUsedSummon = hasUsedSummon;
		this.tasks = tasks;
	}
	public addRole(role: roles_.Role): Player {
		return this.copy({
			roles: {
				captain: (this.roles?.captain ?? false) || role === `captain`,
				guard: (this.roles?.guard ?? false) || role === `guard`,
				planner: (this.roles?.planner ?? false) || role === `planner`,
				worker: (this.roles?.worker ?? false) || role === `worker`,
			},
		});
	}
	public readonly attitude: attitude_.Attitude | null;
	public becomeGhost(): Player {
		return this.copy({
			stateOfDeath:
				this.stateOfDeath === `executed` ?
					`ghostOfExecuted`
				:	`ghostOfMurdered`,
		});
	}
	private copy(
		overrides: Partial<{
			readonly attitude: attitude_.Attitude | null;
			readonly hasArrivedToBase: boolean | null;
			readonly hasUsedEscape: boolean | null;
			readonly hasUsedSummon: boolean | null;
			readonly id: string;
			readonly imprisonment: imprisonment_.Imprisonment;
			readonly isDoneVoting: boolean | null;
			readonly person: person_.Person;
			readonly roles: null | roles_.Roles;
			readonly skills: null | skills_.Skills;
			readonly stateOfDeath: null | stateOfDeath_.State;
			readonly tasks: readonly (null | task_.Task)[];
			readonly votesToExpel: null | ReadonlySet<string>;
			readonly wantsToStart: boolean | null;
		}>,
	): Player {
		return new Player(
			overrides.person ?? this.person,
			overrides.id ?? this.id,
			`stateOfDeath` in overrides ? overrides.stateOfDeath : this.stateOfDeath,
			`wantsToStart` in overrides ? overrides.wantsToStart : this.wantsToStart,
			`hasArrivedToBase` in overrides ?
				overrides.hasArrivedToBase
			:	this.hasArrivedToBase,
			`isDoneVoting` in overrides ? overrides.isDoneVoting : this.isDoneVoting,
			`votesToExpel` in overrides ? overrides.votesToExpel : this.votesToExpel,
			`attitude` in overrides ? overrides.attitude : this.attitude,
			`roles` in overrides ? overrides.roles : this.roles,
			`skills` in overrides ? overrides.skills : this.skills,
			`imprisonment` in overrides ? overrides.imprisonment : this.imprisonment,
			`hasUsedEscape` in overrides ?
				overrides.hasUsedEscape
			:	this.hasUsedEscape,
			`hasUsedSummon` in overrides ?
				overrides.hasUsedSummon
			:	this.hasUsedSummon,
			`tasks` in overrides ? overrides.tasks : this.tasks,
		);
	}
	public escapeFromJail(): Player {
		return this.copy({hasUsedEscape: true, imprisonment: `escaped`});
	}
	public getNextTask(): null | task_.Task {
		const nextTask: null | task_.Task | undefined = this.tasks.find(
			function findNextTask(task: null | task_.Task): boolean {
				return task !== null;
			},
		);
		return nextTask ?? null;
	}
	public readonly hasArrivedToBase: boolean | null;
	public readonly hasUsedEscape: boolean | null;
	public readonly hasUsedSummon: boolean | null;
	public readonly id: string;
	public imprison(): Player {
		return this.copy({imprisonment: `imprisoned`});
	}
	public readonly imprisonment: imprisonment_.Imprisonment;
	public readonly isDoneVoting: boolean | null;
	public markAsExecuted(): Player {
		return this.copy({stateOfDeath: `executed`});
	}
	public markAsFreshlyMurdered(): Player {
		return this.copy({stateOfDeath: `freshlyMurdered`});
	}
	public readonly person: person_.Person;
	public releaseFromJail(): Player {
		return this.copy({imprisonment: `free`});
	}
	public resetForNewRound(): Player {
		return this.copy({
			hasArrivedToBase: false,
			isDoneVoting: false,
			tasks: [null, null],
			votesToExpel: new Set(),
			wantsToStart: false,
		});
	}
	public revealDeath(): Player {
		return this.copy({stateOfDeath: `murdered`});
	}
	public readonly roles: null | roles_.Roles;
	public setAttitude(attitude: attitude_.Attitude): Player {
		return this.copy({attitude: attitude});
	}
	public setHasArrivedToBase(hasArrivedToBase: boolean): Player {
		return this.copy({hasArrivedToBase: hasArrivedToBase});
	}
	public setHasUsedEscape(hasUsedEscape: boolean): Player {
		return this.copy({hasUsedEscape: hasUsedEscape});
	}
	public setHasUsedSummon(hasUsedSummon: boolean): Player {
		return this.copy({hasUsedSummon: hasUsedSummon});
	}
	public setIsDoneVoting(isDoneVoting: boolean): Player {
		return this.copy({isDoneVoting: isDoneVoting});
	}
	public setSkills(skills: skills_.Skills): Player {
		return this.copy({skills: skills});
	}
	public setTasks(tasks: readonly (null | task_.Task)[]): Player {
		return this.copy({tasks: tasks});
	}
	public setVoteToExpel(
		idOfTargetedPlayer: Player[`id`],
		choice: boolean,
	): Player {
		const votesToExpel: Set<Player[`id`]> = new Set(this.votesToExpel ?? []);
		if (choice) {
			votesToExpel.add(idOfTargetedPlayer);
		} else {
			votesToExpel.delete(idOfTargetedPlayer);
		}
		return this.copy({votesToExpel: votesToExpel});
	}
	public setWantsToStart(wantsToStart: boolean): Player {
		return this.copy({wantsToStart: wantsToStart});
	}
	public readonly skills: null | skills_.Skills;
	public snapshotify(
		idOfGame: string,
	): client_.core_.snapshotOfGame_.snapshotOfPlayer_.Snapshot {
		const snapshotOfThis: client_.core_.snapshotOfGame_.snapshotOfPlayer_.Snapshot =
			{
				id: this.id,
				isKnownToBeDead: (this.stateOfDeath ?? `alive`) !== `alive`,
				person: this.person.snapshotify(idOfGame, this.id),
				roles: this.roles,
			};
		return snapshotOfThis;
	}
	public snapshotifyAsCurrent(
		game: game_.Game,
	): client_.core_.snapshotOfGame_.snapshotOfCurrentPlayer_.Snapshot {
		const plannerCandidates: client_.core_.snapshotOfGame_.snapshotOfCurrentPlayer_.snapshotOfOption_.Snapshot[] =
			[];
		for (const player of game.players.values()) {
			if (
				player.stateOfDeath === `alive`
				&& player.imprisonment !== `imprisoned`
				&& player.id !== this.id
			) {
				plannerCandidates.push({id: player.id, name: player.person.name});
			} else {
				continue;
			}
		}
		const summonableDead: client_.core_.snapshotOfGame_.snapshotOfCurrentPlayer_.snapshotOfOption_.Snapshot[] =
			[];
		for (const player of game.players.values()) {
			if (
				player.stateOfDeath === `murdered`
				|| player.stateOfDeath === `executed`
			) {
				summonableDead.push({id: player.id, name: player.person.name});
			} else {
				continue;
			}
		}
		const targets: client_.core_.snapshotOfGame_.snapshotOfCurrentPlayer_.snapshotOfTarget_.Snapshot[] =
			[];
		for (const player of game.players.values()) {
			if (player.stateOfDeath === `alive` && player.id !== this.id) {
				targets.push({
					hasVotedToExecute: this.votesToExpel?.has(player.id) ?? false,
					id: player.id,
					name: player.person.name,
				});
			} else {
				continue;
			}
		}
		const fellowHostiles: client_.core_.snapshotOfGame_.snapshotOfCurrentPlayer_.snapshotOfOption_.Snapshot[] =
			[];
		if (this.attitude === `hostile`) {
			for (const player of game.players.values()) {
				if (player.id !== this.id && player.attitude === `hostile`) {
					fellowHostiles.push({id: player.id, name: player.person.name});
				} else {
					continue;
				}
			}
		}
		const assignments: client_.core_.snapshotOfGame_.snapshotOfAssignment_.Snapshot[] =
			[];
		for (const player of game.players.values()) {
			if (
				(player.roles?.worker ?? false)
				&& player.stateOfDeath === `alive`
				&& player.imprisonment !== `imprisoned`
			) {
				assignments.push({
					idOfPlayer: player.id,
					nameOfPlayer: player.person.name,
					tasks: player.tasks.map(function snapshotifyTaskInSlot(
						task: null | task_.Task,
					): client_.core_.snapshotOfGame_.snapshotOfTask_.Snapshot | null {
						return task === null ? null : task.snapshotify();
					}),
				});
			} else {
				continue;
			}
		}
		const namesOfSkills: string[] = [];
		if (this.skills?.medium ?? false) {
			namesOfSkills.push(language.skills.medium);
		} else {
			/* empty */
		}
		if (this.skills?.escapist ?? false) {
			namesOfSkills.push(language.skills.escapist);
		} else {
			/* empty */
		}
		if (this.skills?.trustworthy ?? false) {
			namesOfSkills.push(language.skills.trustworthy);
		} else {
			/* empty */
		}
		const nameOfSkillsWhenPresent: string =
			namesOfSkills.length === 0 ?
				language.noSkills
			:	namesOfSkills.join(` · `);
		const nameOfSkills: null | string =
			this.skills === null ? null : nameOfSkillsWhenPresent;
		const namesOfRoles: string[] = [];
		if (this.roles?.captain ?? false) {
			namesOfRoles.push(language.roles.captain);
		} else {
			/* empty */
		}
		if (this.roles?.guard ?? false) {
			namesOfRoles.push(language.roles.guard);
		} else {
			/* empty */
		}
		if (this.roles?.planner ?? false) {
			namesOfRoles.push(language.roles.planner);
		} else {
			/* empty */
		}
		if (this.roles?.worker ?? false) {
			namesOfRoles.push(language.roles.worker);
		} else {
			/* empty */
		}
		const nameOfRole: null | string =
			this.roles === null ? null : namesOfRoles.join(` · `);
		const nextTask: null | task_.Task = this.getNextTask();
		const snapshotOfThis: client_.core_.snapshotOfGame_.snapshotOfCurrentPlayer_.Snapshot =
			{
				assignments: assignments,
				canEscape:
					(this.skills?.escapist ?? false)
					&& this.imprisonment === `imprisoned`
					&& !(this.hasUsedEscape ?? false),
				canSummon:
					(this.skills?.medium ?? false)
					&& this.stateOfDeath === `alive`
					&& this.imprisonment !== `imprisoned`
					&& !(this.hasUsedSummon ?? false),
				fellowHostiles: this.attitude === `hostile` ? fellowHostiles : null,
				hasAlivePlanner: game.getPlannerId() !== null,
				hasArrivedToBase: this.hasArrivedToBase ?? false,
				id: this.id,
				idOfPendingPlayer: game.idOfPendingPlayer,
				idOfPendingTask: game.idOfPendingTask,
				indexOfPendingSlot: game.indexOfPendingSlot,
				isCaptain: this.roles?.captain ?? false,
				isDoneVoting: this.isDoneVoting ?? false,
				isKnownToBeDead: this.stateOfDeath !== `alive`,
				isKnownToBeInJail: this.imprisonment === `imprisoned`,
				isPlanner: this.roles?.planner ?? false,
				nameOfAttitude:
					this.attitude === null ? null : language.attitudes[this.attitude],
				nameOfRole: nameOfRole,
				nameOfSkills: nameOfSkills,
				plannerCandidates: plannerCandidates,
				summonableDead: summonableDead,
				targets: targets,
				tasks: nextTask === null ? [] : [nextTask.snapshotify()],
				wantsToStart: this.wantsToStart ?? false,
			};
		return snapshotOfThis;
	}
	public snapshotifyFully(
		idOfGame: string,
	): client_.core_.snapshotOfGame_.snapshotOfFullPlayer_.Snapshot {
		const snapshotOfThis: client_.core_.snapshotOfGame_.snapshotOfFullPlayer_.Snapshot =
			{
				attitude: this.attitude,
				id: this.id,
				imprisonment: this.imprisonment,
				name: this.person.name,
				roles: this.roles,
				skills: this.skills,
				stateOfDeath: this.stateOfDeath ?? `alive`,
				urlOfPhoto: this.person.snapshotify(idOfGame, this.id).urlOfPhoto,
			};
		return snapshotOfThis;
	}
	public readonly stateOfDeath: null | stateOfDeath_.State;
	public readonly tasks: readonly (null | task_.Task)[];
	public readonly votesToExpel: null | ReadonlySet<string>;
	public readonly wantsToStart: boolean | null;
}
