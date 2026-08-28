import {server_} from "../../server/module.ts";
import type {RequestEvent} from "./$types.d.ts";
function getNumberOfPlayers(game: server_.core_.game_.Game): number {
	return game.players.size;
}
export async function GET(event: RequestEvent): Promise<Response> {
	const instances_ = await server_.importingInstances_.import_();
	const streamer: server_.core_.streamingEvents_.Streamer<number> =
		await server_.core_.streamingEvents_.Streamer.create<number>(
			`playersCount`,
		);
	const initialGame: server_.core_.game_.Game =
		instances_.storageOfGame_.storageOfGame.getCurrentGame();
	streamer.feed(getNumberOfPlayers(initialGame));
	function handleGameUpdated(updatedGame: server_.core_.game_.Game): void {
		streamer.feed(getNumberOfPlayers(updatedGame));
		return;
	}
	event.request.signal.addEventListener(
		`abort`,
		function handleAbort(): void {
			instances_.storageOfGame_.storageOfGame.removeListener(handleGameUpdated);
			streamer.destroy();
			return;
		},
		{once: true},
	);
	instances_.storageOfGame_.storageOfGame.addListener(handleGameUpdated);
	return streamer.response;
}
