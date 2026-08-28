import type {client_} from "../../../../client/module.ts";
import type {message_} from "../../message/module.ts";
import type {player_} from "../../player/module.ts";
import type {Game} from "../Game.ts";
export function* snapshotify(
	messages: readonly message_.Message[],
	players: ReadonlyMap<player_.Player[`id`], player_.Player>,
	idOfGame: Game[`id`],
): Generator<
	client_.core_.snapshotOfGame_.snapshotOfMessage_.Snapshot,
	void,
	void
> {
	for (const message of messages) {
		const author: player_.Player | undefined = players.get(message.idOfAuthor);
		if (author === undefined) {
			const error: Error = new Error(
				`Author of message ${message.id} does not exist.`,
			);
			throw error;
		} else {
			const snapshotOfMessage: client_.core_.snapshotOfGame_.snapshotOfMessage_.Snapshot =
				message.snapshotify(author.snapshotify(idOfGame));
			yield snapshotOfMessage;
			continue;
		}
	}
	return;
}
