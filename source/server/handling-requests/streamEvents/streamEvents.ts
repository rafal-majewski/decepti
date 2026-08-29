import {core_} from "../../core/module.ts";
import {importingInstances_} from "../../importing-instances/module.ts";
import type {feed_} from "../Feed/module.ts";
import type {RequestEvent} from "@sveltejs/kit";
export async function streamEvents<Data>(
	event: RequestEvent,
	idOfEvent: string,
	feed: feed_.Feed<Data>,
): Promise<Response> {
	const instances_ = await importingInstances_.import_();
	const storageOfGame: core_.storageOfGame_.StorageOfGame =
		instances_.storageOfGame_.storageOfGame;
	const streamer: core_.streamingEvents_.Streamer<Data> =
		await core_.streamingEvents_.Streamer.create<Data>(idOfEvent);
	const initialGame: core_.game_.Game = storageOfGame.getCurrentGame();
	streamer.feed(feed(initialGame));
	function handleGameUpdated(updatedGame: core_.game_.Game): void {
		streamer.feed(feed(updatedGame));
		return;
	}
	event.request.signal.addEventListener(
		`abort`,
		function handleAbort(): void {
			storageOfGame.removeListener(handleGameUpdated);
			return;
		},
		{once: true},
	);
	storageOfGame.addListener(handleGameUpdated);
	return streamer.response;
}
