import type {client_} from "../../../client/module.ts";
import {generatingRandomId_} from "../../../generating-random-id/module.ts";
import type {attitude_} from "../attitude/module.ts";
import {copyingThenSettingInMap_} from "../copying-then-setting-in-map/module.ts";
import {language} from "../language.ts";
import {location_} from "../location/module.ts";
import type {message_} from "../message/module.ts";
import type {player_} from "../player/module.ts";
import type {roles_} from "../roles/module.ts";
import type {skills_} from "../skills/module.ts";
import {task_} from "../task/module.ts";
import {snapshotifyingMessages_} from "./snapshotifying-messages/module.ts";
import {snapshotifyingPlayers_} from "./snapshotifying-players/module.ts";
import type {state_} from "./state/module.ts";
const defaultNumberOfTasksPerPlayer: number = 12;
const defaultPercentageOfHostile: number = 20;
const probabilityOfSkill: number = 0.3;
function shuffleTasks(tasks: readonly task_.Task[]): task_.Task[] {
	const shuffled: task_.Task[] = [...tasks];
	for (let index: number = shuffled.length - 1; index > 0; index = index - 1) {
		const otherIndex: number = Math.floor(Math.random() * (index + 1));
		const current: task_.Task | undefined = shuffled[index];
		const other: task_.Task | undefined = shuffled[otherIndex];
		if (current === undefined || other === undefined) {
			continue;
		} else {
			shuffled[index] = other;
			shuffled[otherIndex] = current;
		}
	}
	return shuffled;
}
function weightOfVote(player: player_.Player): number {
	if (player.skills?.trustworthy ?? false) {
		return 2;
	} else {
		return 1;
	}
}
export class Game {
	public static createEmpty(): Game {
		const game: Game = new Game(
			generatingRandomId_.generate(),
			new Map<player_.Player[`id`], player_.Player>(),
			[],
			`lobby`,
			null,
			null,
			null,
			null,
			defaultNumberOfTasksPerPlayer,
			defaultPercentageOfHostile,
			null,
		);
		return game;
	}
	public constructor(
		id: string,
		players: ReadonlyMap<player_.Player[`id`], player_.Player>,
		messages: readonly message_.Message[],
		state: state_.State,
		tasks: null | readonly task_.Task[],
		idOfPendingTask: null | string,
		idOfPendingPlayer: null | string,
		indexOfPendingSlot: 0 | 1 | null,
		tasksPerPlayer: number,
		percentageOfHostile: number,
		tasksOfRound: null | readonly task_.Task[],
	) {
		this.id = id;
		this.players = players;
		this.messages = messages;
		this.state = state;
		this.tasks = tasks;
		this.idOfPendingTask = idOfPendingTask;
		this.idOfPendingPlayer = idOfPendingPlayer;
		this.indexOfPendingSlot = indexOfPendingSlot;
		this.tasksPerPlayer = tasksPerPlayer;
		this.percentageOfHostile = percentageOfHostile;
		this.tasksOfRound = tasksOfRound;
	}
	public addMessage(message: message_.Message): Game {
		const messagesOfUpdatedThis: readonly message_.Message[] = [
			...this.messages,
			message,
		];
		const updatedThis: Game = new Game(
			this.id,
			this.players,
			messagesOfUpdatedThis,
			this.state,
			this.tasks,
			this.idOfPendingTask,
			this.idOfPendingPlayer,
			this.indexOfPendingSlot,
			this.tasksPerPlayer,
			this.percentageOfHostile,
			this.tasksOfRound,
		);
		return updatedThis;
	}
	public addPlayer(player: player_.Player): Game {
		const playersOfUpdatedThis: Map<player_.Player[`id`], player_.Player> =
			copyingThenSettingInMap_.copyThenSet(this.players, player.id, player);
		const updatedThis: Game = new Game(
			this.id,
			playersOfUpdatedThis,
			this.messages,
			this.state,
			this.tasks,
			this.idOfPendingTask,
			this.idOfPendingPlayer,
			this.indexOfPendingSlot,
			this.tasksPerPlayer,
			this.percentageOfHostile,
			this.tasksOfRound,
		);
		return updatedThis;
	}
	public arriveAtBase(idOfPlayer: player_.Player[`id`]): Game {
		if (this.state === `returning` || this.state === `maintaining`) {
			const player: player_.Player | undefined = this.players.get(idOfPlayer);
			if (
				player === undefined
				|| player.stateOfDeath !== `alive`
				|| player.imprisonment === `imprisoned`
				|| (this.state === `maintaining` && player.getNextTask() !== null)
			) {
				return this;
			} else {
				const updatedThis: Game = this.replacePlayer(
					player.setHasArrivedToBase(true),
				);
				if (updatedThis.checkIfAllAlivePlayersArrived()) {
					return updatedThis.setState(`discussing`).revealDeaths();
				} else {
					return updatedThis;
				}
			}
		} else {
			return this;
		}
	}
	public assignPlanner(
		idOfCaptain: player_.Player[`id`],
		idOfNewPlanner: player_.Player[`id`],
	): Game {
		if (this.state !== `discussing`) {
			return this;
		} else {
			const captain: player_.Player | undefined = this.players.get(idOfCaptain);
			if (
				captain === undefined
				|| captain.stateOfDeath !== `alive`
				|| captain.imprisonment === `imprisoned`
				|| !(captain.roles?.captain ?? false)
			) {
				return this;
			} else {
				if (this.getPlannerId() !== null) {
					return this;
				} else {
					const target: player_.Player | undefined =
						this.players.get(idOfNewPlanner);
					if (
						target === undefined
						|| target.stateOfDeath !== `alive`
						|| target.imprisonment === `imprisoned`
					) {
						return this;
					} else {
						return this.replacePlayer(target.addRole(`planner`));
					}
				}
			}
		}
	}
	public assignRoles(): Game {
		const idsOfPlayers: readonly string[] = Array.from(this.players.keys());
		if (idsOfPlayers.length === 0) {
			return this;
		} else {
			const idOfCaptain: string | undefined =
				idsOfPlayers[Math.floor(Math.random() * idsOfPlayers.length)];
			if (idOfCaptain === undefined) {
				return this;
			} else {
				const idsWithoutCaptain: string[] = [];
				for (const id of idsOfPlayers) {
					if (id !== idOfCaptain) {
						idsWithoutCaptain.push(id);
					} else {
						/* empty */
					}
				}
				const idOfPlanner: string | undefined =
					idsWithoutCaptain[
						Math.floor(Math.random() * idsWithoutCaptain.length)
					];
				const idsWithoutCaptainAndPlanner: string[] = [];
				for (const id of idsWithoutCaptain) {
					if (id !== idOfPlanner) {
						idsWithoutCaptainAndPlanner.push(id);
					} else {
						/* empty */
					}
				}
				const idOfGuard: string | undefined =
					idsWithoutCaptainAndPlanner[
						Math.floor(Math.random() * idsWithoutCaptainAndPlanner.length)
					];
				const idsOfHostilePlayers: Set<string> = new Set<string>();
				for (const id of idsOfPlayers) {
					if (Math.random() < this.percentageOfHostile / 100) {
						idsOfHostilePlayers.add(id);
					} else {
						/* empty */
					}
				}
				if (idsOfHostilePlayers.size === 0) {
					const idOfForcedHostile: string | undefined =
						idsOfPlayers[Math.floor(Math.random() * idsOfPlayers.length)];
					if (idOfForcedHostile === undefined) {
						/* empty */
					} else {
						idsOfHostilePlayers.add(idOfForcedHostile);
					}
				}
				return this.mapPlayers(function assignRoleAttitudeAndSkills(
					player: player_.Player,
				): player_.Player {
					let role: roles_.Role = `worker`;
					if (player.id === idOfCaptain) {
						role = `captain`;
					} else if (player.id === idOfPlanner) {
						role = `planner`;
					} else if (player.id === idOfGuard) {
						role = `guard`;
					} else {
						/* empty */
					}
					const attitude: attitude_.Attitude =
						idsOfHostilePlayers.has(player.id) ? `hostile` : `friendly`;
				const skills: skills_.Skills = {
					escapist: Math.random() < probabilityOfSkill,
					medium: Math.random() < probabilityOfSkill,
					trustworthy: Math.random() < probabilityOfSkill,
				};
					const updatedPlayer: player_.Player = player
						.addRole(role)
						.addRole(`worker`)
						.setAttitude(attitude)
						.setSkills(skills);
					return updatedPlayer;
				});
			}
		}
	}
	public assignTasksToWorkers(): Game {
		const tasks: null | readonly task_.Task[] = this.tasks;
		if (tasks === null || tasks.length === 0) {
			return this.mapPlayers(function clearTasks(
				player: player_.Player,
			): player_.Player {
				return player.setTasks([null, null]);
			});
		} else {
			const idsOfAssignedTasks: Set<string> = new Set<string>();
			for (const player of this.players.values()) {
				for (const task of player.tasks) {
					if (task !== null) {
						idsOfAssignedTasks.add(task.id);
					}
				}
			}
			const unassignedTasks: task_.Task[] = [];
			for (const task of tasks) {
				if (idsOfAssignedTasks.has(task.id)) {
					continue;
				} else {
					unassignedTasks.push(task);
				}
			}
			const shuffledTasks: task_.Task[] = shuffleTasks(unassignedTasks);
			let indexOfTask: number = 0;
			return this.mapPlayers(function assignTasks(
				player: player_.Player,
			): player_.Player {
				if (
					!(player.roles?.worker ?? false)
					|| player.stateOfDeath !== `alive`
					|| player.imprisonment === `imprisoned`
				) {
					return player.setTasks([null, null]);
				} else {
					const tasksToAssign: (null | task_.Task)[] = [null, null];
					for (
						let indexOfSlot: number = 0;
						indexOfSlot < 2;
						indexOfSlot = indexOfSlot + 1
					) {
						const task: task_.Task | undefined = shuffledTasks[indexOfTask];
						if (task === undefined) {
							break;
						} else {
							tasksToAssign[indexOfSlot] = task;
							indexOfTask = indexOfTask + 1;
						}
					}
					return player.setTasks(tasksToAssign);
				}
			});
		}
	}
	public beginConnectingPlayer(
		idOfPlanner: player_.Player[`id`],
		idOfPlayer: player_.Player[`id`],
		indexOfSlot: 0 | 1,
	): Game {
		if (this.state !== `planning`) {
			return this;
		} else {
			if (idOfPlanner !== this.getPlannerId()) {
				return this;
			} else {
				const player: player_.Player | undefined = this.players.get(idOfPlayer);
				if (
					player === undefined
					|| !(player.roles?.worker ?? false)
					|| player.stateOfDeath !== `alive`
					|| player.imprisonment === `imprisoned`
					|| player.tasks[indexOfSlot] !== null
				) {
					return this;
				} else {
					return this.setPendingConnecting(null, idOfPlayer, indexOfSlot);
				}
			}
		}
	}
	public beginConnectingTask(
		idOfPlanner: player_.Player[`id`],
		idOfTask: task_.Task[`id`],
	): Game {
		if (this.state !== `planning`) {
			return this;
		} else {
			if (idOfPlanner !== this.getPlannerId()) {
				return this;
			} else {
				const task: task_.Task | undefined = (this.tasks ?? []).find(
					function findTask(taskToFind: task_.Task): boolean {
						return taskToFind.id === idOfTask;
					},
				);
				if (
					task === undefined
					|| this.getHolderOfTask(idOfTask) !== undefined
				) {
					return this;
				} else {
					return this.setPendingConnecting(idOfTask, null, null);
				}
			}
		}
	}
	public callMeeting(): Game {
		if (this.state !== `maintaining`) {
			return this;
		} else {
			return this.setState(`returning`);
		}
	}
	public cancelConnecting(idOfPlanner: player_.Player[`id`]): Game {
		if (this.state !== `planning`) {
			return this;
		} else {
			if (idOfPlanner !== this.getPlannerId()) {
				return this;
			} else {
				return this.setPendingConnecting(null, null, null);
			}
		}
	}
	public captureTasksOfRound(): Game {
		const tasksOfRound: task_.Task[] = [];
		const idsOfCapturedTasks: Set<string> = new Set<string>();
		for (const player of this.players.values()) {
			for (const task of player.tasks) {
				if (task === null || idsOfCapturedTasks.has(task.id)) {
					continue;
				} else {
					idsOfCapturedTasks.add(task.id);
					tasksOfRound.push(task);
				}
			}
		}
		const updatedThis: Game = new Game(
			this.id,
			this.players,
			this.messages,
			this.state,
			this.tasks,
			this.idOfPendingTask,
			this.idOfPendingPlayer,
			this.indexOfPendingSlot,
			this.tasksPerPlayer,
			this.percentageOfHostile,
			tasksOfRound,
		);
		return updatedThis;
	}
	public checkIfAllAlivePlayersArrived(): boolean {
		const players: IteratorObject<player_.Player, void, void> =
			this.players.values();
		for (const player of players) {
			if (
				player.stateOfDeath === `alive`
				&& player.imprisonment !== `imprisoned`
				&& !(player.hasArrivedToBase ?? false)
			) {
				return false;
			} else {
				continue;
			}
		}
		return true;
	}
	public checkIfAllAlivePlayersDoneVoting(): boolean {
		const players: IteratorObject<player_.Player, void, void> =
			this.players.values();
		for (const player of players) {
			if (
				player.stateOfDeath === `alive`
				&& player.imprisonment !== `imprisoned`
				&& !(player.isDoneVoting ?? false)
			) {
				return false;
			} else {
				continue;
			}
		}
		return true;
	}
	public checkIfAllAlivePlayersWantToStart(): boolean {
		const players: IteratorObject<player_.Player, void, void> =
			this.players.values();
		for (const player of players) {
			if (player.stateOfDeath === `alive` && !(player.wantsToStart ?? false)) {
				return false;
			} else {
				continue;
			}
		}
		return true;
	}
	public completeTask(
		idOfPlayer: player_.Player[`id`],
		idOfTask: task_.Task[`id`],
	): Game {
		if (this.state !== `maintaining`) {
			return this;
		} else {
			const player: player_.Player | undefined = this.players.get(idOfPlayer);
			if (
				player === undefined
				|| player.stateOfDeath !== `alive`
				|| player.imprisonment === `imprisoned`
			) {
				return this;
			} else {
				const nextTask: null | task_.Task = player.getNextTask();
				if (nextTask === null || nextTask.id !== idOfTask) {
					return this;
				} else {
					const tasksOfUpdatedPlayer: readonly (null | task_.Task)[] =
						player.tasks.map(function clearCompletedTask(
							taskToCheck: null | task_.Task,
						): null | task_.Task {
							return taskToCheck !== null && taskToCheck.id === idOfTask ?
									null
								:	taskToCheck;
						});
					const tasksOfUpdatedGame: readonly task_.Task[] = (
						this.tasks ?? []
					).filter(function keepOtherTasks(task: task_.Task): boolean {
						return task.id !== idOfTask;
					});
					const updatedThis: Game = this.replacePlayer(
						player.setTasks(tasksOfUpdatedPlayer),
					).setTasks(tasksOfUpdatedGame);
					if (tasksOfUpdatedGame.length === 0) {
						return updatedThis.setState(`end`).revealDeaths();
					} else {
						return updatedThis;
					}
				}
			}
		}
	}
	public connectTaskToPlayer(
		idOfPlanner: player_.Player[`id`],
		idOfTask: task_.Task[`id`],
		idOfPlayer: player_.Player[`id`],
		indexOfSlot: 0 | 1,
	): Game {
		if (this.state !== `planning`) {
			return this;
		} else {
			if (idOfPlanner !== this.getPlannerId()) {
				return this;
			} else {
				if (
					this.idOfPendingTask !== idOfTask
					&& (this.idOfPendingPlayer !== idOfPlayer
						|| this.indexOfPendingSlot !== indexOfSlot)
				) {
					return this;
				} else {
					const task: task_.Task | undefined = (this.tasks ?? []).find(
						function findTask(taskToFind: task_.Task): boolean {
							return taskToFind.id === idOfTask;
						},
					);
					if (
						task === undefined
						|| this.getHolderOfTask(idOfTask) !== undefined
					) {
						return this;
					} else {
						const target: player_.Player | undefined =
							this.players.get(idOfPlayer);
						if (
							target === undefined
							|| !(target.roles?.worker ?? false)
							|| target.stateOfDeath !== `alive`
							|| target.imprisonment === `imprisoned`
							|| target.tasks[indexOfSlot] !== null
						) {
							return this;
						} else {
							const updatedThis: Game = this.replacePlayer(
								target.setTasks(
									target.tasks.map(function setSlot(
										taskInSlot: null | task_.Task,
										index: number,
									): null | task_.Task {
										return index === indexOfSlot ? task : taskInSlot;
									}),
								),
							).setPendingConnecting(null, null, null);
							return updatedThis;
						}
					}
				}
			}
		}
	}
	public continueFromPlanning(
		idOfPlayer: player_.Player[`id`],
		choice: boolean,
	): Game {
		if (this.state !== `planning`) {
			return this;
		} else {
			if (!choice) {
				return this;
			} else {
				if (idOfPlayer !== this.getPlannerId()) {
					return this;
				} else {
					return this.setState(`maintaining`).setPendingConnecting(
						null,
						null,
						null,
					);
				}
			}
		}
	}
	public disconnectTask(
		idOfPlanner: player_.Player[`id`],
		idOfTask: task_.Task[`id`],
	): Game {
		if (this.state !== `planning`) {
			return this;
		} else {
			if (idOfPlanner !== this.getPlannerId()) {
				return this;
			} else {
				const holder: player_.Player | undefined =
					this.getHolderOfTask(idOfTask);
				if (holder === undefined) {
					return this;
				} else {
					return this.replacePlayer(
						holder.setTasks(
							holder.tasks.map(function clearTask(
								taskToCheck: null | task_.Task,
							): null | task_.Task {
								return taskToCheck !== null && taskToCheck.id === idOfTask ?
										null
									:	taskToCheck;
							}),
						),
					);
				}
			}
		}
	}
	public escapeFromJail(idOfPlayer: player_.Player[`id`]): Game {
		if (this.state !== `maintaining`) {
			return this;
		} else {
			const player: player_.Player | undefined = this.players.get(idOfPlayer);
			if (
				player === undefined
				|| player.stateOfDeath !== `alive`
				|| player.imprisonment !== `imprisoned`
				|| !(player.skills?.escapist ?? false)
				|| (player.hasUsedEscape ?? false)
			) {
				return this;
			} else {
				return this.replacePlayer(player.escapeFromJail());
			}
		}
	}
	public ensurePlanner(): Game {
		if (this.getPlannerId() !== null) {
			return this;
		} else {
			const captain: player_.Player | undefined = Array.from(
				this.players.values(),
			).find(function findAliveCaptain(player: player_.Player): boolean {
				return (
					player.stateOfDeath === `alive`
					&& player.imprisonment !== `imprisoned`
					&& (player.roles?.captain ?? false)
				);
			});
			const candidate: player_.Player | undefined =
				captain
				?? Array.from(this.players.values()).find(function findAlivePlayer(
						player: player_.Player,
					): boolean {
						return (
							player.stateOfDeath === `alive`
							&& player.imprisonment !== `imprisoned`
						);
					});
			if (candidate === undefined) {
				return this;
			} else {
				return this.replacePlayer(candidate.addRole(`planner`));
			}
		}
	}
	public finishVoting(idOfPlayer: player_.Player[`id`], choice: boolean): Game {
		if (this.state !== `discussing`) {
			return this;
		} else {
			const player: player_.Player | undefined = this.players.get(idOfPlayer);
			if (
				player === undefined
				|| player.stateOfDeath !== `alive`
				|| player.imprisonment === `imprisoned`
			) {
				return this;
			} else {
				const updatedThis: Game = this.replacePlayer(
					player.setIsDoneVoting(choice),
				);
				if (choice && updatedThis.checkIfAllAlivePlayersDoneVoting()) {
					return updatedThis.tallyAndExpel();
				} else {
					return updatedThis;
				}
			}
		}
	}
	public generateTasksIfNeeded(): Game {
		if (this.tasks !== null) {
			return this;
		} else {
			const numberOfTasks: number = Math.max(
				1,
				this.getNumberOfWorkers() * this.tasksPerPlayer,
			);
			const tasks: task_.Task[] = [];
			for (let index: number = 0; index < numberOfTasks; index = index + 1) {
				const location: location_.Place | undefined =
					location_.locations[
						Math.floor(Math.random() * location_.locations.length)
					];
				if (location === undefined) {
					continue;
				} else {
					tasks.push(
						new task_.Task(generatingRandomId_.generate(), location.id),
					);
				}
			}
			return this.setTasks(tasks);
		}
	}
	private getHolderOfTask(
		idOfTask: task_.Task[`id`],
	): player_.Player | undefined {
		return Array.from(this.players.values()).find(function holdsTask(
			player: player_.Player,
		): boolean {
			return player.tasks.some(function hasTask(
				taskToCheck: null | task_.Task,
			): boolean {
				return taskToCheck !== null && taskToCheck.id === idOfTask;
			});
		});
	}
	public getNumberOfVoters(): number {
		let numberOfVoters: number = 0;
		for (const player of this.players.values()) {
			if (
				player.stateOfDeath === `alive`
				&& player.imprisonment !== `imprisoned`
			) {
				numberOfVoters = numberOfVoters + 1;
			} else {
				/* empty */
			}
		}
		return numberOfVoters;
	}
	public getNumberOfWorkers(): number {
		let numberOfWorkers: number = 0;
		for (const player of this.players.values()) {
			if (player.roles?.worker ?? false) {
				numberOfWorkers = numberOfWorkers + 1;
			} else {
				/* empty */
			}
		}
		return numberOfWorkers;
	}
	public getPlannerId(): null | player_.Player[`id`] {
		for (const player of this.players.values()) {
			if (player.stateOfDeath === `alive` && (player.roles?.planner ?? false)) {
				return player.id;
			} else {
				continue;
			}
		}
		return null;
	}
	public getWinner(): `friendly` | `hostile` | null {
		if (this.tasks !== null && this.tasks.length === 0) {
			return `friendly`;
		} else if (!this.hasAlivePlayerWithAttitude(`friendly`)) {
			return `hostile`;
		} else {
			if (!this.hasAlivePlayerWithAttitude(`hostile`)) {
				return `friendly`;
			} else {
				return null;
			}
		}
	}
	private hasAlivePlayerWithAttitude(attitude: attitude_.Attitude): boolean {
		for (const player of this.players.values()) {
			if (player.stateOfDeath === `alive` && player.attitude === attitude) {
				return true;
			} else {
				continue;
			}
		}
		return false;
	}
	public readonly id: string;
	public readonly idOfPendingPlayer: null | string;
	public readonly idOfPendingTask: null | string;
	public readonly indexOfPendingSlot: 0 | 1 | null;
	public mapPlayers(mapper: (player: player_.Player) => player_.Player): Game {
		const playersOfUpdatedThis: Map<string, player_.Player> = new Map();
		for (const [id, player] of this.players) {
			playersOfUpdatedThis.set(id, mapper(player));
		}
		const updatedThis: Game = new Game(
			this.id,
			playersOfUpdatedThis,
			this.messages,
			this.state,
			this.tasks,
			this.idOfPendingTask,
			this.idOfPendingPlayer,
			this.indexOfPendingSlot,
			this.tasksPerPlayer,
			this.percentageOfHostile,
			this.tasksOfRound,
		);
		return updatedThis;
	}
	public readonly messages: readonly message_.Message[];
	public readonly percentageOfHostile: number;
	public planTasks(): Game {
		return this.generateTasksIfNeeded()
			.assignTasksToWorkers()
			.captureTasksOfRound()
			.setPendingConnecting(null, null, null);
	}
	public readonly players: ReadonlyMap<string, player_.Player>;
	public releaseAllFromJail(): Game {
		return this.mapPlayers(function releaseFromJail(
			player: player_.Player,
		): player_.Player {
			if (player.imprisonment === `imprisoned`) {
				const updatedPlayer: player_.Player = player.releaseFromJail();
				return updatedPlayer;
			} else {
				return player;
			}
		});
	}
	public replacePlayer(player: player_.Player): Game {
		const playersOfUpdatedThis: Map<player_.Player[`id`], player_.Player> =
			copyingThenSettingInMap_.copyThenSet(this.players, player.id, player);
		const updatedThis: Game = new Game(
			this.id,
			playersOfUpdatedThis,
			this.messages,
			this.state,
			this.tasks,
			this.idOfPendingTask,
			this.idOfPendingPlayer,
			this.indexOfPendingSlot,
			this.tasksPerPlayer,
			this.percentageOfHostile,
			this.tasksOfRound,
		);
		return updatedThis;
	}
	public reportDeath(idOfPlayer: player_.Player[`id`]): Game {
		if (this.state !== `maintaining`) {
			return this;
		} else {
			const player: player_.Player | undefined = this.players.get(idOfPlayer);
			if (player === undefined || player.stateOfDeath !== `alive`) {
				return this;
			} else {
				const updatedThis: Game = this.replacePlayer(
					player.markAsFreshlyMurdered(),
				);
				if (updatedThis.getWinner() !== null) {
					return updatedThis.setState(`end`).revealDeaths();
				} else {
					return updatedThis;
				}
			}
		}
	}
	public resetForNewRound(): Game {
		return this.mapPlayers(function resetForNewRound(
			player: player_.Player,
		): player_.Player {
			const updatedPlayer: player_.Player = player.resetForNewRound();
			return updatedPlayer;
		});
	}
	public revealDeaths(): Game {
		return this.mapPlayers(function revealDeath(
			player: player_.Player,
		): player_.Player {
			if (player.stateOfDeath === `freshlyMurdered`) {
				const updatedPlayer: player_.Player = player.revealDeath();
				return updatedPlayer;
			} else {
				return player;
			}
		});
	}
	public setAttitudeOfPlayer(
		idOfPlayer: player_.Player[`id`],
		attitude: attitude_.Attitude,
	): Game {
		const player: player_.Player | undefined = this.players.get(idOfPlayer);
		if (player === undefined) {
			return this;
		} else {
			return this.replacePlayer(player.setAttitude(attitude));
		}
	}
	public setPendingConnecting(
		idOfTask: null | task_.Task[`id`],
		idOfPlayer: null | player_.Player[`id`],
		indexOfSlot: 0 | 1 | null,
	): Game {
		const updatedThis: Game = new Game(
			this.id,
			this.players,
			this.messages,
			this.state,
			this.tasks,
			idOfTask,
			idOfPlayer,
			indexOfSlot,
			this.tasksPerPlayer,
			this.percentageOfHostile,
			this.tasksOfRound,
		);
		return updatedThis;
	}
	public setPercentageOfHostile(percentageOfHostile: number): Game {
		if (this.state !== `lobby`) {
			return this;
		} else {
			const updatedThis: Game = new Game(
				this.id,
				this.players,
				this.messages,
				this.state,
				this.tasks,
				this.idOfPendingTask,
				this.idOfPendingPlayer,
				this.indexOfPendingSlot,
				this.tasksPerPlayer,
				percentageOfHostile,
				this.tasksOfRound,
			);
			return updatedThis;
		}
	}
	public setSkillsOfPlayer(
		idOfPlayer: player_.Player[`id`],
		skills: skills_.Skills,
	): Game {
		const player: player_.Player | undefined = this.players.get(idOfPlayer);
		if (player === undefined) {
			return this;
		} else {
			return this.replacePlayer(player.setSkills(skills));
		}
	}
	public setState(state: state_.State): Game {
		const updatedThis: Game = new Game(
			this.id,
			this.players,
			this.messages,
			state,
			this.tasks,
			this.idOfPendingTask,
			this.idOfPendingPlayer,
			this.indexOfPendingSlot,
			this.tasksPerPlayer,
			this.percentageOfHostile,
			this.tasksOfRound,
		);
		return updatedThis;
	}
	public setTasks(tasks: null | readonly task_.Task[]): Game {
		const updatedThis: Game = new Game(
			this.id,
			this.players,
			this.messages,
			this.state,
			tasks,
			this.idOfPendingTask,
			this.idOfPendingPlayer,
			this.indexOfPendingSlot,
			this.tasksPerPlayer,
			this.percentageOfHostile,
			this.tasksOfRound,
		);
		return updatedThis;
	}
	public setTasksPerPlayer(tasksPerPlayer: number): Game {
		if (this.state !== `lobby`) {
			return this;
		} else {
			const updatedThis: Game = new Game(
				this.id,
				this.players,
				this.messages,
				this.state,
				this.tasks,
				this.idOfPendingTask,
				this.idOfPendingPlayer,
				this.indexOfPendingSlot,
				tasksPerPlayer,
				this.percentageOfHostile,
				this.tasksOfRound,
			);
			return updatedThis;
		}
	}
	public snapshotify(
		idOfCurrentPlayer: player_.Player[`id`],
	): client_.core_.snapshotOfGame_.Snapshot {
		const currentPlayer: player_.Player | undefined =
			this.players.get(idOfCurrentPlayer);
		if (currentPlayer === undefined) {
			const error: Error = new Error(
				`Current player ${idOfCurrentPlayer} does not exist.`,
			);
			throw error;
		} else {
			/* empty */
		}
		const snapshotsOfPlayersOfThis: readonly client_.core_.snapshotOfGame_.snapshotOfPlayer_.Snapshot[] =
			Array.from(snapshotifyingPlayers_.snapshotify(this.players, this.id));
		const snapshotsOfMessagesOfThis: readonly client_.core_.snapshotOfGame_.snapshotOfMessage_.Snapshot[] =
			Array.from(
				snapshotifyingMessages_.snapshotify(
					this.messages,
					this.players,
					this.id,
				),
			);
		const snapshotsOfLocations: readonly client_.core_.snapshotOfGame_.snapshotOfLocation_.Snapshot[] =
			location_.locations.map(function snapshotifyLocation(
				location: location_.Place,
			): client_.core_.snapshotOfGame_.snapshotOfLocation_.Snapshot {
				return {id: location.id, name: location.name};
			});
		const snapshotsOfTasks:
			null | readonly client_.core_.snapshotOfGame_.snapshotOfTask_.Snapshot[] =
			this.tasksOfRound === null ?
				null
			:	this.tasksOfRound.map(function snapshotifyTask(
					task: task_.Task,
				): client_.core_.snapshotOfGame_.snapshotOfTask_.Snapshot {
					return task.snapshotify();
				});
		const snapshotOfThis: client_.core_.snapshotOfGame_.Snapshot = {
			currentPlayer: currentPlayer.snapshotifyAsCurrent(this),
			id: this.id,
			locations: snapshotsOfLocations,
			messages: snapshotsOfMessagesOfThis,
			nameOfState: language.states[this.state],
			numberOfRemainingTasks: this.tasks?.length ?? 0,
			players: snapshotsOfPlayersOfThis,
			state: this.state,
			tasks: snapshotsOfTasks,
			winners: this.snapshotifyWinners(),
		};
		return snapshotOfThis;
	}
	private snapshotifyWinners(): client_.core_.snapshotOfGame_.snapshotOfWinners_.Snapshot | null {
		if (this.state !== `end`) {
			return null;
		} else {
			const attitude: `friendly` | `hostile` | null = this.getWinner();
			if (attitude === null) {
				return null;
			} else {
				const players: client_.core_.snapshotOfGame_.snapshotOfPlayer_.Snapshot[] =
					[];
				for (const player of this.players.values()) {
					if (player.attitude === attitude) {
						players.push(player.snapshotify(this.id));
					} else {
						continue;
					}
				}
				return {attitude: attitude, players: players};
			}
		}
	}
	public readonly state: state_.State;
	public summonGhost(
		idOfMedium: player_.Player[`id`],
		idOfDeadPlayer: player_.Player[`id`],
	): Game {
		if (this.state !== `discussing`) {
			return this;
		} else {
			const medium: player_.Player | undefined = this.players.get(idOfMedium);
			if (
				medium === undefined
				|| medium.stateOfDeath !== `alive`
				|| medium.imprisonment === `imprisoned`
				|| !(medium.skills?.medium ?? false)
				|| (medium.hasUsedSummon ?? false)
			) {
				return this;
			} else {
				const target: player_.Player | undefined =
					this.players.get(idOfDeadPlayer);
				if (
					target === undefined
					|| (target.stateOfDeath !== `murdered`
						&& target.stateOfDeath !== `executed`)
				) {
					return this;
				} else {
					const updatedThis: Game = this.replacePlayer(
						medium.setHasUsedSummon(true),
					);
					return updatedThis.replacePlayer(target.becomeGhost());
				}
			}
		}
	}
	public tallyAndExpel(): Game {
		let maximumNumberOfVotes: number = 0;
		for (const voter of this.players.values()) {
			if (
				voter.stateOfDeath === `alive`
				&& voter.imprisonment !== `imprisoned`
			) {
				maximumNumberOfVotes = maximumNumberOfVotes + weightOfVote(voter);
			} else {
				/* empty */
			}
		}
		const idsOfPlayersToJail: string[] = [];
		const idsOfPlayersToKill: string[] = [];
		for (const [idOfTarget, target] of this.players) {
			if (target.stateOfDeath !== `alive`) {
				continue;
			} else {
				let numberOfVotesToExpel: number = 0;
				for (const voter of this.players.values()) {
					if (
						voter.stateOfDeath === `alive`
						&& voter.imprisonment !== `imprisoned`
						&& (voter.votesToExpel?.has(idOfTarget) ?? false)
					) {
						numberOfVotesToExpel = numberOfVotesToExpel + weightOfVote(voter);
					} else {
						/* empty */
					}
				}
				if (numberOfVotesToExpel > maximumNumberOfVotes / 2) {
					idsOfPlayersToKill.push(idOfTarget);
				} else if (
					maximumNumberOfVotes > 0
					&& numberOfVotesToExpel * 2 === maximumNumberOfVotes
				) {
					idsOfPlayersToJail.push(idOfTarget);
				} else {
					/* empty */
				}
			}
		}
		let updatedThis: Game = this.releaseAllFromJail();
		for (const idOfTarget of idsOfPlayersToKill) {
			const target: player_.Player | undefined =
				updatedThis.players.get(idOfTarget);
			if (target === undefined) {
				continue;
			} else {
				updatedThis = updatedThis.replacePlayer(target.markAsExecuted());
			}
		}
		for (const idOfTarget of idsOfPlayersToJail) {
			const target: player_.Player | undefined =
				updatedThis.players.get(idOfTarget);
			if (target === undefined) {
				continue;
			} else {
				updatedThis = updatedThis.replacePlayer(target.imprison());
			}
		}
		if (updatedThis.getWinner() !== null) {
			return updatedThis.setState(`end`).revealDeaths();
		} else {
			return updatedThis.setState(`planning`).resetForNewRound().planTasks();
		}
	}
	public readonly tasks: null | readonly task_.Task[];
	public readonly tasksOfRound: null | readonly task_.Task[];
	public readonly tasksPerPlayer: number;
	public voteToExpel(
		idOfPlayer: player_.Player[`id`],
		idOfTargetedPlayer: player_.Player[`id`],
		choice: boolean,
	): Game {
		if (this.state !== `discussing`) {
			return this;
		} else {
			const player: player_.Player | undefined = this.players.get(idOfPlayer);
			if (
				player === undefined
				|| player.stateOfDeath !== `alive`
				|| player.imprisonment === `imprisoned`
			) {
				return this;
			} else {
				const target: player_.Player | undefined =
					this.players.get(idOfTargetedPlayer);
				if (target === undefined || target.stateOfDeath !== `alive`) {
					return this;
				} else {
					return this.replacePlayer(
						player.setVoteToExpel(idOfTargetedPlayer, choice),
					);
				}
			}
		}
	}
	public voteToStart(idOfPlayer: player_.Player[`id`], choice: boolean): Game {
		if (this.state !== `lobby`) {
			return this;
		} else {
			const player: player_.Player | undefined = this.players.get(idOfPlayer);
			if (player === undefined || player.stateOfDeath !== `alive`) {
				return this;
			} else {
				const updatedThis: Game = this.replacePlayer(
					player.setWantsToStart(choice),
				);
				if (choice && updatedThis.checkIfAllAlivePlayersWantToStart()) {
					return updatedThis
						.setState(`planning`)
						.assignRoles()
						.resetForNewRound()
						.planTasks();
				} else {
					return updatedThis;
				}
			}
		}
	}
}
