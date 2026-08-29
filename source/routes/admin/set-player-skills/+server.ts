import {resolve} from "$app/paths";
import {server_} from "../../../server/module.ts";
import type {RequestEvent} from "./$types.d.ts";
import {redirect} from "@sveltejs/kit";
import {z} from "zod";
const schemaForInputData = z.strictObject({
	escapist: z.enum([`false`, `true`]),
	idOfPlayer: z.string().nonempty(),
	medium: z.enum([`false`, `true`]),
	trustworthy: z.enum([`false`, `true`]),
});
export async function POST(event: RequestEvent): Promise<Response> {
	const formData: FormData = await event.request.formData();
	const result = schemaForInputData.safeParse(Object.fromEntries(formData));
	if (result.success) {
		const instances_ = await server_.importingInstances_.import_();
		const skills: server_.core_.skills_.Skills = {
			escapist: result.data.escapist === `true`,
			medium: result.data.medium === `true`,
			trustworthy: result.data.trustworthy === `true`,
		};
		instances_.storageOfGame_.storageOfGame.setSkillsOfPlayer(
			result.data.idOfPlayer,
			skills,
		);
	} else {
		/* empty */
	}
	redirect(303, resolve(`/admin`));
}
