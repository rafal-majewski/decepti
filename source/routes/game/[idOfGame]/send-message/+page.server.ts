import {resolve} from "$app/paths";
import {server_} from "../../../../server/module.ts";
import type {Actions, RequestEvent} from "./$types.d.ts";
import {stringifyingZodIssues} from "@native-typescript/stringifying-zod-issues";
import {type ActionFailure, fail, redirect} from "@sveltejs/kit";
import {z} from "zod";
const schemaForMessage = z.strictObject({text: z.string().nonempty()});
type InputData = z.infer<typeof schemaForMessage>;
type Result = ActionFailure<{readonly issues: string}>;
export const actions = {
	default: async function sendMessage(event: RequestEvent): Promise<Result> {
		const inputDataAsFormData: FormData = await event.request.formData();
		const resultOfValidatingInputData: z.ZodSafeParseResult<InputData> =
			server_.core_.validatingFormData_.validate(
				inputDataAsFormData,
				schemaForMessage,
			);
		if (resultOfValidatingInputData.success) {
			const instances_ = await server_.importingInstances_.import_();
			const idOfAuthor: string | undefined = event.cookies.get(`idOfPlayer`);
			const currentGame: server_.core_.game_.Game =
				instances_.storageOfGame_.storageOfGame.getCurrentGame();
			if (currentGame.id === event.params.idOfGame) {
				if (
					idOfAuthor === undefined
					|| currentGame.players.get(idOfAuthor) === undefined
				) {
					const result = fail(403, {issues: `Nie jesteś graczem tej gry.`});
					return result;
				} else {
					const newMessage: server_.core_.message_.Message =
						server_.core_.message_.Message.createNew({
							idOfAuthor: idOfAuthor,
							text: resultOfValidatingInputData.data.text,
						});
					instances_.storageOfGame_.storageOfGame.addMessage(newMessage);
					redirect(303, resolve(`/game`));
				}
			} else {
				const result = fail(404, {issues: `Gra nie istnieje.`});
				return result;
			}
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
