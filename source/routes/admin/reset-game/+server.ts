import {resolve} from "$app/paths";
import {server_} from "../../../server/module.ts";
import type {RequestEvent} from "./$types.d.ts";
import {redirect} from "@sveltejs/kit";
export async function POST(event: RequestEvent): Promise<Response> {
	const instances_ = await server_.importingInstances_.import_();
	instances_.storageOfGame_.storageOfGame.restart();
	redirect(303, resolve(`/`));
}
