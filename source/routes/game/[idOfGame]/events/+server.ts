import type {client_} from "../../../../client/module.ts";
import {server_} from "../../../../server/module.ts";
import type {RequestEvent} from "./$types.d.ts";
export async function GET(event: RequestEvent): Promise<Response> {
	const instances_ = await server_.importingInstances_.import_();
	const currentGame: server_.core_.game_.Game =
		instances_.storageOfGame_.storageOfGame.getCurrentGame();
	if (currentGame.id === event.params.idOfGame) {
		const idOfJoinedGame: string | undefined =
			event.cookies.get(`idOfJoinedGame`);
		if (idOfJoinedGame === undefined || idOfJoinedGame !== currentGame.id) {
			const response: Response = new Response(null, {status: 403});
			return response;
		} else {
			const streamer: server_.core_.streamingEvents_.Streamer<client_.core_.snapshotOfGame_.Snapshot> =
				await server_.core_.streamingEvents_.Streamer.create<client_.core_.snapshotOfGame_.Snapshot>(
					`gameState`,
				);
			streamer.feed(currentGame.snapshotify());
			function handleGameUpdated(updatedGame: server_.core_.game_.Game): void {
				streamer.feed(updatedGame.snapshotify());
				return;
			}
			event.request.signal.addEventListener(
				`abort`,
				function handleAbort(): void {
					instances_.storageOfGame_.storageOfGame.removeListener(
						handleGameUpdated,
					);
					streamer.destroy();
					return;
				},
				{once: true},
			);
			instances_.storageOfGame_.storageOfGame.addListener(handleGameUpdated);
			return streamer.response;
		}
	} else {
		const response: Response = new Response(null, {status: 404});
		return response;
	}
}
