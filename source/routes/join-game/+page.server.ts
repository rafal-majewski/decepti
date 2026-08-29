import {resolve} from "$app/paths";
import {server_} from "../../server/module.ts";
import type {Actions, RequestEvent} from "./$types.d.ts";
import {stringifyingZodIssues} from "@native-typescript/stringifying-zod-issues";
import {type ActionFailure, fail, redirect} from "@sveltejs/kit";
import {z} from "zod";
const schemaForInputData = z.strictObject({
	gender: server_.core_.gender_.schema,
	name: z.string().nonempty(),
	photo: z.instanceof(File),
});
type Result = ActionFailure<{readonly issues: string}>;
export const actions = {
	default: async function joinGame(event: RequestEvent): Promise<Result> {
		const inputDataAsFormData: FormData = await event.request.formData();
		const resultOfValidatingInputData =
			server_.core_.validatingFormData_.validate(
				inputDataAsFormData,
				schemaForInputData,
			);
		if (resultOfValidatingInputData.success) {
			const newPlayer = server_.core_.player_.Player.createNew(
				resultOfValidatingInputData.data,
			);
			const instances_ = await server_.importingInstances_.import_();
			instances_.storageOfGame_.storageOfGame.addPlayer(newPlayer);
			const currentGame: server_.core_.game_.Game =
				instances_.storageOfGame_.storageOfGame.getCurrentGame();
			event.cookies.set(`idOfPlayer`, newPlayer.id, {
				httpOnly: true,
				path: `/`,
			});
			redirect(303, resolve(`/game/${currentGame.id}`));
		} else {
			const result: Result = fail(400, {
				issues: stringifyingZodIssues.stringifyZodIssues(
					resultOfValidatingInputData.error.issues,
				),
			});
			return result;
		}
	},
} satisfies Actions;
