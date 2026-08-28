import type {client_} from "../../../client/module.ts";
import {generatingRandomId_} from "../../../generating-random-id/module.ts";
import {copyingThenSettingInMap_} from "../copying-then-setting-in-map/module.ts";
import type {message_} from "../message/module.ts";
import type {player_} from "../player/module.ts";
import {snapshotifyingMessages_} from "./snapshotifying-messages/module.ts";
import {snapshotifyingPlayers_} from "./snapshotifying-players/module.ts";
export class Game {
	public static createEmpty(): Game {
		const game: Game = new Game(
			generatingRandomId_.generate(),
			new Map<player_.Player[`id`], player_.Player>(),
			[],
		);
		return game;
	}
	public constructor(
		id: string,
		players: ReadonlyMap<player_.Player[`id`], player_.Player>,
		messages: readonly message_.Message[],
	) {
		this.id = id;
		this.players = players;
		this.messages = messages;
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
		);
		return updatedThis;
	}
	public readonly id: string;
	public readonly messages: readonly message_.Message[];
	public readonly players: ReadonlyMap<string, player_.Player>;
	public snapshotify(): client_.core_.snapshotOfGame_.Snapshot {
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
		const snapshotOfThis: client_.core_.snapshotOfGame_.Snapshot = {
			id: this.id,
			messages: snapshotsOfMessagesOfThis,
			players: snapshotsOfPlayersOfThis,
		};
		return snapshotOfThis;
	}
}
