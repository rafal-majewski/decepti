import {server_} from "../../../../../../server/module.ts";
import type {RequestEvent} from "./$types.d.ts";
export async function GET(event: RequestEvent): Promise<Response> {
	const instances_ = await server_.importingInstances_.import_();
	const currentGame: server_.core_.game_.Game =
		instances_.storageOfGame_.storageOfGame.getCurrentGame();
	if (currentGame.id === event.params.idOfGame) {
		const player: server_.core_.player_.Player | undefined =
			currentGame.players.get(event.params.idOfPlayer);
		if (player === undefined) {
			const response: Response = new Response(null, {status: 404});
			return response;
		} else {
			const response: Response = new Response(player.person.photo, {
				headers: {"content-type": player.person.photo.type},
			});
			return response;
		}
	} else {
		const response: Response = new Response(null, {status: 404});
		return response;
	}
}
