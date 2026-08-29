import {resolve} from "$app/paths";
import {server_} from "../../../server/module.ts";
import type {RequestEvent} from "./$types.d.ts";
import {redirect} from "@sveltejs/kit";
import {z} from "zod";
const schemaForInputData = z.strictObject({name: z.string().nonempty()});
export async function POST(event: RequestEvent): Promise<Response> {
	const formData: FormData = await event.request.formData();
	const result = schemaForInputData.safeParse(Object.fromEntries(formData));
	if (result.success) {
		const instances_ = await server_.importingInstances_.import_();
		instances_.storageOfGame_.storageOfGame.addLocation(result.data.name);
	} else {
		/* empty */
	}
	redirect(303, resolve(`/admin`));
}
