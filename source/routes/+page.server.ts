import {idOfAdapter_} from "../id-of-adapter/module.ts";
import type {server_} from "../server/module.ts";
import type {
	PageServerLoadEvent,
	PageServerParentData,
	RouteId,
	RouteParams,
} from "./$types.d.ts";
type OutputData = {readonly [key: string]: never};
export const load = (
	{
		node: async function nodeLoad(
			event: PageServerLoadEvent,
		): Promise<OutputData> {
			return {};
		},
		static: async function staticLoad(
			event: PageServerLoadEvent,
		): Promise<OutputData> {
			return {};
		},
	} as const satisfies server_.loadingFunctionsOfPages_.Functions<
		RouteParams,
		PageServerParentData,
		OutputData,
		RouteId
	>
)[idOfAdapter_.id];
