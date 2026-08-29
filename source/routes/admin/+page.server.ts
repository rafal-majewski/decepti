import type {client_} from "../../client/module.ts";
import {server_} from "../../server/module.ts";
import type {PageServerLoadEvent} from "./$types.d.ts";
type Result = {
	readonly locations: readonly {readonly id: string; readonly name: string}[];
	readonly numberOfTasksPerPlayer: number;
	readonly percentageOfHostile: number;
	readonly players: readonly client_.core_.snapshotOfGame_.snapshotOfFullPlayer_.Snapshot[];
};
export async function load(event: PageServerLoadEvent): Promise<Result> {
	const instances_ = await server_.importingInstances_.import_();
	const currentGame: server_.core_.game_.Game =
		instances_.storageOfGame_.storageOfGame.getCurrentGame();
	const players: readonly client_.core_.snapshotOfGame_.snapshotOfFullPlayer_.Snapshot[] =
		Array.from(currentGame.players.values()).map(function snapshotifyFully(
			player: server_.core_.player_.Player,
		): client_.core_.snapshotOfGame_.snapshotOfFullPlayer_.Snapshot {
			return player.snapshotifyFully(currentGame.id);
		});
	const locations: readonly {readonly id: string; readonly name: string}[] =
		server_.core_.location_.locations.map(function snapshotifyLocation(
			location: server_.core_.location_.Place,
		): {readonly id: string; readonly name: string} {
			return {id: location.id, name: location.name};
		});
	const result: Result = {
		locations: locations,
		numberOfTasksPerPlayer: currentGame.tasksPerPlayer,
		percentageOfHostile: currentGame.percentageOfHostile,
		players: players,
	};
	return result;
}
