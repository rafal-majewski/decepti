import {server_} from "../../../../server/module.ts";
import type {Actions, RequestEvent} from "./$types.d.ts";
export const actions = {
	default: async function escapeFromJail(
		event: RequestEvent,
	): Promise<server_.handlingRequests_.result_.Result> {
		return await server_.handlingRequests_.handleAction(
			event.cookies.get(`idOfPlayer`) ?? null,
			event.params.idOfGame,
			function do_(context: server_.handlingRequests_.context_.Context): void {
				context.storageOfGame.escapeFromJail(context.player.id);
				return;
			},
		);
	},
} satisfies Actions;
