import {server_} from "../../../../server/module.ts";
import type {Actions, RequestEvent} from "./$types.d.ts";
import {z} from "zod";
const schemaForInputData = z.strictObject({
	choice: server_.core_.choice_.schema,
});
export const actions = {
	default: async function finishVoting(
		event: RequestEvent,
	): Promise<server_.handlingRequests_.result_.Result> {
		return await server_.handlingRequests_.handleActionWithData(
			event,
			event.params.idOfGame,
			schemaForInputData,
			function do_(
				context: server_.handlingRequests_.context_.Context,
				data: z.infer<typeof schemaForInputData>,
			): void {
				const choice: boolean = data.choice === `tak`;
				context.storageOfGame.finishVoting(context.player.id, choice);
				return;
			},
		);
	},
} satisfies Actions;
