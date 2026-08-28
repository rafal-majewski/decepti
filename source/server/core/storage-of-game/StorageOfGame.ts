import type {game_} from "../game/module.ts";
import type {message_} from "../message/module.ts";
import type {player_} from "../player/module.ts";
import {creatingRemoverOfListener_} from "./creating-remover-of-listener/module.ts";
import type {listener_} from "./listener/module.ts";
import type {removerOfListener_} from "./remover-of-listener/module.ts";
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
	public addMessage(message: message_.Message): void {
		const updatedGame: game_.Game = this.game.addMessage(message);
		this.game = updatedGame;
		this.notifyListeners(updatedGame);
		return;
	}
	public addPlayer(player: player_.Player): void {
		const updatedGame: game_.Game = this.game.addPlayer(player);
		this.game = updatedGame;
		this.notifyListeners(updatedGame);
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
}
