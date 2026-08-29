import {core_} from "../core/module.ts";
import type {doerWithData_} from "./DoerWithData/module.ts";
import {handleAction} from "./handleAction.ts";
import type {result_} from "./Result/module.ts";
import {stringifyingZodIssues} from "@native-typescript/stringifying-zod-issues";
import {fail, type RequestEvent} from "@sveltejs/kit";
import type {z} from "zod";
export async function handleActionWithData<Data>(
	event: RequestEvent,
	idOfGame: string,
	schema: z.ZodType<Data>,
	doer: doerWithData_.DoerWithData<Data>,
): Promise<result_.Result> {
	const inputDataAsFormData: FormData = await event.request.formData();
	const resultOfValidatingInputData: z.ZodSafeParseResult<Data> =
		core_.validatingFormData_.validate(inputDataAsFormData, schema);
	if (resultOfValidatingInputData.success) {
		const idOfPlayer: string | undefined = event.cookies.get(`idOfPlayer`);
		const result: result_.Result = await handleAction(
			idOfPlayer === undefined ? null : idOfPlayer,
			idOfGame,
			function (context): void {
				doer(context, resultOfValidatingInputData.data);
				return;
			},
		);
		return result;
	} else {
		const result: result_.Result = fail(400, {
			issues: stringifyingZodIssues.stringifyZodIssues(
				resultOfValidatingInputData.error.issues,
			),
		});
		return result;
	}
}
