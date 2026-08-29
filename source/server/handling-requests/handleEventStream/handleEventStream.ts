import type {core_} from "../../core/module.ts";
import {importingInstances_} from "../../importing-instances/module.ts";
import type {context_} from "../Context/module.ts";
import type {feedWithContext_} from "../FeedWithContext/module.ts";
import {streamEvents} from "../streamEvents/module.ts";
import type {RequestEvent} from "@sveltejs/kit";
export async function handleEventStream<Data>(
	event: RequestEvent,
	idOfGame: string,
	idOfEvent: string,
	feed: feedWithContext_.FeedWithContext<Data>,
): Promise<Response> {
	const idOfPlayer: string | undefined = event.cookies.get(`idOfPlayer`);
	if (idOfPlayer === undefined) {
		const response: Response = new Response(null, {status: 403});
		return response;
	} else {
		const instances_ = await importingInstances_.import_();
		const storageOfGame: core_.storageOfGame_.StorageOfGame =
			instances_.storageOfGame_.storageOfGame;
		const currentGame: core_.game_.Game = storageOfGame.getCurrentGame();
		if (currentGame.id === idOfGame) {
			const player: core_.player_.Player | undefined =
				currentGame.players.get(idOfPlayer);
			if (player === undefined) {
				const response: Response = new Response(null, {status: 403});
				return response;
			} else {
				const context: context_.Context = {
					player: player,
					storageOfGame: storageOfGame,
				};
				const response: Response = await streamEvents(
					event,
					idOfEvent,
					function feedGame(game): Data {
						return feed(context, game);
					},
				);
				return response;
			}
		} else {
			const response: Response = new Response(null, {status: 404});
			return response;
		}
	}
}
