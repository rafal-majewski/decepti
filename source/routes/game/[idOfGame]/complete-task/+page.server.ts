import {server_} from "../../../../server/module.ts";
import type {Actions, RequestEvent} from "./$types.d.ts";
import {z} from "zod";
const schemaForInputData = z.strictObject({idOfTask: z.string().nonempty()});
export const actions = {
	default: async function completeTask(
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
				context.storageOfGame.completeTask(context.player.id, data.idOfTask);
				return;
			},
		);
	},
} satisfies Actions;
