import {server_} from "../../../../server/module.ts";
import type {Actions, RequestEvent} from "./$types.d.ts";
import {z} from "zod";
const schemaForInputData = z.strictObject({
	idOfPlayer: z.string().nonempty(),
	indexOfSlot: z.union([z.literal(`0`), z.literal(`1`)]),
});
export const actions = {
	default: async function beginConnectPlayer(
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
				const indexOfSlot: 0 | 1 = data.indexOfSlot === `1` ? 1 : 0;
				context.storageOfGame.beginConnectingPlayer(
					context.player.id,
					data.idOfPlayer,
					indexOfSlot,
				);
				return;
			},
		);
	},
} satisfies Actions;
