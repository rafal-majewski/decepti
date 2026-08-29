import type {client_} from "../../../client/module.ts";
import {server_} from "../../../server/module.ts";
import type {PageServerLoadEvent} from "./$types.d.ts";
import {redirect} from "@sveltejs/kit";
type Result = {
	readonly game: client_.core_.snapshotOfGame_.Snapshot;
	readonly idOfPlayer: string | undefined;
	readonly vapidPublicKey: string;
};
export async function load(event: PageServerLoadEvent): Promise<Result> {
	const instances_ = await server_.importingInstances_.import_();
	const currentGame: server_.core_.game_.Game =
		instances_.storageOfGame_.storageOfGame.getCurrentGame();
	if (currentGame.id !== event.params.idOfGame) {
		event.cookies.delete(`idOfPlayer`, {path: `/`});
		redirect(303, `/`);
	} else {
		const idOfPlayer: string | undefined = event.cookies.get(`idOfPlayer`);
		if (
			idOfPlayer === undefined
			|| currentGame.players.get(idOfPlayer) === undefined
		) {
			event.cookies.delete(`idOfPlayer`, {path: `/`});
			redirect(303, `/`);
		} else {
			const snapshotOfCurrentGame: client_.core_.snapshotOfGame_.Snapshot =
				currentGame.snapshotify(idOfPlayer);
			const result: Result = {
				game: snapshotOfCurrentGame,
				idOfPlayer: idOfPlayer,
				vapidPublicKey: process.env[`WEB_PUSH__PUBLIC_KEY`] ?? ``,
			};
			return result;
		}
	}
}
