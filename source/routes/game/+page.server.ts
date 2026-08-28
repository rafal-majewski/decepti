import type {client_} from "../../client/module.ts";
import {server_} from "../../server/module.ts";
import type {PageServerLoadEvent} from "./$types.d.ts";
import {redirect} from "@sveltejs/kit";
type Result = {readonly game: client_.core_.snapshotOfGame_.Snapshot};
export async function load(event: PageServerLoadEvent): Promise<Result> {
	const instances_ = await server_.importingInstances_.import_();
	const currentGame: server_.core_.game_.Game =
		instances_.storageOfGame_.storageOfGame.getCurrentGame();
	const idOfJoinedGame: string | undefined =
		event.cookies.get(`idOfJoinedGame`);
	if (idOfJoinedGame === undefined || idOfJoinedGame !== currentGame.id) {
		redirect(303, `/`);
	} else {
		const snapshotOfCurrentGame: client_.core_.snapshotOfGame_.Snapshot =
			currentGame.snapshotify();
		const result: Result = {game: snapshotOfCurrentGame};
		return result;
	}
}
