import type {client_} from "../../../client/module.ts";
import {generatingRandomId_} from "../../../generating-random-id/module.ts";
import {copyingThenSettingInMap_} from "../copying-then-setting-in-map/module.ts";
import type {player_} from "../player/module.ts";
import {snapshotifyingPlayers_} from "./snapshotifying-players/module.ts";
export class Game {
	public static createEmpty(): Game {
		const game: Game = new Game(
			generatingRandomId_.generate(),
			new Map<player_.Player[`id`], player_.Player>(),
			0,
		);
		return game;
	}
	public constructor(
		id: string,
		players: ReadonlyMap<player_.Player[`id`], player_.Player>,
		version: number,
	) {
		this.id = id;
		this.players = players;
		this.version = version;
	}
	public addPlayer(player: player_.Player): Game {
		const playersOfUpdatedThis: Map<player_.Player[`id`], player_.Player> =
			copyingThenSettingInMap_.copyThenSet(this.players, player.id, player);
		const updatedThis: Game = new Game(
			this.id,
			playersOfUpdatedThis,
			this.version + 1,
		);
		return updatedThis;
	}
	public readonly id: string;
	public readonly players: ReadonlyMap<string, player_.Player>;
	public snapshotify(): client_.core_.snapshotOfGame_.Snapshot {
		const snapshotsOfPlayersOfThis: readonly client_.core_.snapshotOfPlayer_.Snapshot[] =
			Array.from(snapshotifyingPlayers_.snapshotify(this.players, this.id));
		const snapshotOfThis: client_.core_.snapshotOfGame_.Snapshot = {
			id: this.id,
			players: snapshotsOfPlayersOfThis,
		};
		return snapshotOfThis;
	}
	public readonly version: number;
}
