import type {client_} from "../../../../client/module.ts";
import type {player_} from "../../player/module.ts";
import type {Game} from "../Game.ts";
export function* snapshotify(
	players: ReadonlyMap<string, player_.Player>,
	idOfGame: Game[`id`],
): Generator<client_.core_.snapshotOfPlayer_.Snapshot, void, void> {
	const valuesOfPlayers: IterableIterator<player_.Player> = players.values();
	for (const player of valuesOfPlayers) {
		const snapshotOfPlayer: client_.core_.snapshotOfPlayer_.Snapshot =
			player.snapshotify(idOfGame);
		yield snapshotOfPlayer;
		continue;
	}
	return;
}
