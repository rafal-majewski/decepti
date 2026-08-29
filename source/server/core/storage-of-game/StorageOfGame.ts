import type {attitude_} from "../attitude/module.ts";
import {game_} from "../game/module.ts";
import {location_} from "../location/module.ts";
import type {message_} from "../message/module.ts";
import type {player_} from "../player/module.ts";
import type {skills_} from "../skills/module.ts";
import {creatingRemoverOfListener_} from "./creating-remover-of-listener/module.ts";
import type {listener_} from "./listener/module.ts";
import type {removerOfListener_} from "./remover-of-listener/module.ts";
import type {transitioner_} from "./transitioner/module.ts";
export class StorageOfGame {
	public constructor(game: game_.Game) {
		this.game = game;
	}
	public addListener(listener: listener_.Listener): removerOfListener_.Remover {
		this.listeners.add(listener);
		const removerOfListener: removerOfListener_.Remover =
			creatingRemoverOfListener_.create(this, listener);
		return removerOfListener;
	}
	public addLocation(name: string): void {
		if (this.game.state !== `lobby`) {
			return;
		} else {
			location_.addLocation(name);
			return;
		}
	}
	public addMessage(message: message_.Message): void {
		this.update(function addMessage(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.addMessage(message);
			return updatedGame;
		});
		return;
	}
	public addPlayer(player: player_.Player): void {
		this.update(function addPlayer(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.addPlayer(player);
			return updatedGame;
		});
		return;
	}
	public arriveAtBase(idOfPlayer: player_.Player[`id`]): void {
		this.update(function arriveAtBase(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.arriveAtBase(idOfPlayer);
			return updatedGame;
		});
		return;
	}
	public assignPlanner(
		idOfCaptain: player_.Player[`id`],
		idOfNewPlanner: player_.Player[`id`],
	): void {
		this.update(function assignPlanner(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.assignPlanner(
				idOfCaptain,
				idOfNewPlanner,
			);
			return updatedGame;
		});
		return;
	}
	public beginConnectingPlayer(
		idOfPlanner: string,
		idOfPlayer: string,
		indexOfSlot: 0 | 1,
	): void {
		this.update(function beginConnectingPlayer(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.beginConnectingPlayer(
				idOfPlanner,
				idOfPlayer,
				indexOfSlot,
			);
			return updatedGame;
		});
		return;
	}
	public beginConnectingTask(idOfPlanner: string, idOfTask: string): void {
		this.update(function beginConnectingTask(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.beginConnectingTask(
				idOfPlanner,
				idOfTask,
			);
			return updatedGame;
		});
		return;
	}
	public callMeeting(): void {
		this.update(function callMeeting(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.callMeeting();
			return updatedGame;
		});
		return;
	}
	public cancelConnecting(idOfPlanner: string): void {
		this.update(function cancelConnecting(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.cancelConnecting(idOfPlanner);
			return updatedGame;
		});
		return;
	}
	public completeTask(idOfPlayer: string, idOfTask: string): void {
		this.update(function completeTask(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.completeTask(idOfPlayer, idOfTask);
			return updatedGame;
		});
		return;
	}
	public connectTaskToPlayer(
		idOfPlanner: string,
		idOfTask: string,
		idOfPlayer: string,
		indexOfSlot: 0 | 1,
	): void {
		this.update(function connectTaskToPlayer(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.connectTaskToPlayer(
				idOfPlanner,
				idOfTask,
				idOfPlayer,
				indexOfSlot,
			);
			return updatedGame;
		});
		return;
	}
	public continueFromPlanning(
		idOfPlayer: player_.Player[`id`],
		choice: boolean,
	): void {
		this.update(function continueFromPlanning(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.continueFromPlanning(
				idOfPlayer,
				choice,
			);
			return updatedGame;
		});
		return;
	}
	public disconnectTask(idOfPlanner: string, idOfTask: string): void {
		this.update(function disconnectTask(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.disconnectTask(
				idOfPlanner,
				idOfTask,
			);
			return updatedGame;
		});
		return;
	}
	public escapeFromJail(idOfPlayer: player_.Player[`id`]): void {
		this.update(function escapeFromJail(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.escapeFromJail(idOfPlayer);
			return updatedGame;
		});
		return;
	}
	public finishVoting(idOfPlayer: player_.Player[`id`], choice: boolean): void {
		this.update(function finishVoting(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.finishVoting(idOfPlayer, choice);
			return updatedGame;
		});
		return;
	}
	private game: game_.Game;
	public getCurrentGame(): game_.Game {
		return this.game;
	}
	private readonly listeners: Set<listener_.Listener> =
		new Set<listener_.Listener>();
	private notifyListeners(updatedGame: game_.Game): void {
		for (const listener of this.listeners) {
			listener(updatedGame);
			continue;
		}
		return;
	}
	public removeListener(listener: listener_.Listener): void {
		this.listeners.delete(listener);
		return;
	}
	public removeLocation(idOfLocation: string): void {
		if (this.game.state !== `lobby`) {
			return;
		} else {
			location_.removeLocation(idOfLocation);
			return;
		}
	}
	public reportDeath(idOfPlayer: player_.Player[`id`]): void {
		this.update(function reportDeath(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.reportDeath(idOfPlayer);
			return updatedGame;
		});
		return;
	}
	public restart(): void {
		const numberOfTasksPerPlayer: number = this.game.tasksPerPlayer;
		const percentageOfHostile: number = this.game.percentageOfHostile;
		this.update(function restart(): game_.Game {
			const updatedGame: game_.Game = game_.Game.createEmpty()
				.setTasksPerPlayer(numberOfTasksPerPlayer)
				.setPercentageOfHostile(percentageOfHostile);
			return updatedGame;
		});
		return;
	}
	public setAttitudeOfPlayer(
		idOfPlayer: player_.Player[`id`],
		attitude: attitude_.Attitude,
	): void {
		this.update(function setAttitudeOfPlayer(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.setAttitudeOfPlayer(
				idOfPlayer,
				attitude,
			);
			return updatedGame;
		});
		return;
	}
	public setPercentageOfHostile(percentageOfHostile: number): void {
		this.update(function setPercentageOfHostile(game: game_.Game): game_.Game {
			const updatedGame: game_.Game =
				game.setPercentageOfHostile(percentageOfHostile);
			return updatedGame;
		});
		return;
	}
	public setSkillsOfPlayer(
		idOfPlayer: player_.Player[`id`],
		skills: skills_.Skills,
	): void {
		this.update(function setSkillsOfPlayer(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.setSkillsOfPlayer(
				idOfPlayer,
				skills,
			);
			return updatedGame;
		});
		return;
	}
	public setTasksPerPlayer(numberOfTasksPerPlayer: number): void {
		this.update(function setTasksPerPlayer(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.setTasksPerPlayer(
				numberOfTasksPerPlayer,
			);
			return updatedGame;
		});
		return;
	}
	public summonGhost(
		idOfMedium: player_.Player[`id`],
		idOfDeadPlayer: player_.Player[`id`],
	): void {
		this.update(function summonGhost(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.summonGhost(
				idOfMedium,
				idOfDeadPlayer,
			);
			return updatedGame;
		});
		return;
	}
	private update(transition: transitioner_.Transitioner): void {
		const updatedGame: game_.Game = transition(this.game);
		this.game = updatedGame;
		this.notifyListeners(updatedGame);
		return;
	}
	public voteToExpel(
		idOfPlayer: player_.Player[`id`],
		idOfTargetedPlayer: player_.Player[`id`],
		choice: boolean,
	): void {
		this.update(function voteToExpel(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.voteToExpel(
				idOfPlayer,
				idOfTargetedPlayer,
				choice,
			);
			return updatedGame;
		});
		return;
	}
	public voteToStart(idOfPlayer: player_.Player[`id`], choice: boolean): void {
		this.update(function voteToStart(game: game_.Game): game_.Game {
			const updatedGame: game_.Game = game.voteToStart(idOfPlayer, choice);
			return updatedGame;
		});
		return;
	}
}
