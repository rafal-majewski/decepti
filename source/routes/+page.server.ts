import {server_} from "../server/module.ts";
import type {PageServerLoadEvent} from "./$types.d.ts";
type Result = {readonly numberOfPlayers: number};
export async function load(event: PageServerLoadEvent): Promise<Result> {
	const currentGame: server_.core_.game_.Game =
		server_.instances_.storageOfGame_.storageOfGame.getCurrentGame();
	const result: Result = {numberOfPlayers: currentGame.players.size};
	return result;
}
