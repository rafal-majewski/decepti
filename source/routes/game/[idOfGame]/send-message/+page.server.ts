import {server_} from "../../../../server/module.ts";
import type {Actions, RequestEvent} from "./$types.d.ts";
import {z} from "zod";
const schemaForMessage = z.strictObject({text: z.string().nonempty()});
export const actions = {
	default: async function sendMessage(
		event: RequestEvent,
	): Promise<server_.handlingRequests_.result_.Result> {
		return await server_.handlingRequests_.handleActionWithData(
			event,
			event.params.idOfGame,
			schemaForMessage,
			function do_(
				context: server_.handlingRequests_.context_.Context,
				data: z.infer<typeof schemaForMessage>,
			): void {
				const newMessage: server_.core_.message_.Message =
					server_.core_.message_.Message.createNew({
						idOfAuthor: context.player.id,
						text: data.text,
					});
				context.storageOfGame.addMessage(newMessage);
				return;
			},
		);
	},
} satisfies Actions;
