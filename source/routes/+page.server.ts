import {server_} from "../server/module.ts";
import type {PageServerLoadEvent} from "./$types.d.ts";
type Result = {readonly countOfPlayers: number};
export async function load(event: PageServerLoadEvent): Promise<Result> {
	const instances_ = await server_.importingInstances_.import_();
	const currentGame: server_.core_.game_.Game =
		instances_.storageOfGame_.storageOfGame.getCurrentGame();
	const result: Result = {countOfPlayers: currentGame.players.size};
	return result;
}
