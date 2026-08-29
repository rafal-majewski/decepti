import {server_} from "../../../../server/module.ts";
import type {Actions, RequestEvent} from "./$types.d.ts";
export const actions = {
	default: async function reportDeath(
		event: RequestEvent,
	): Promise<server_.handlingAction_.result_.Result> {
		return await server_.handlingAction_.handleAction(
			event.cookies.get(`idOfPlayer`) ?? null,
			event.params.idOfGame,
			function perform(
				context: server_.handlingAction_.context_.Context,
			): void {
				context.storageOfGame.reportDeath(context.idOfPlayer);
				return;
			},
		);
	},
} satisfies Actions;
