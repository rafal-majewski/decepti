import type {client_} from "../../../../client/module.ts";
import {server_} from "../../../../server/module.ts";
import type {RequestEvent} from "./$types.d.ts";
export async function GET(event: RequestEvent): Promise<Response> {
	return await server_.handlingRequests_.handleEventStream(
		event,
		event.params.idOfGame,
		`gameUpdated`,
		function snapshotifyGame(
			context: server_.handlingRequests_.context_.Context,
			game: server_.core_.game_.Game,
		): client_.core_.snapshotOfGame_.Snapshot | null {
			if (game.players.get(context.player.id) === undefined) {
				return null;
			} else {
				return game.snapshotify(context.player.id);
			}
		},
	);
}
