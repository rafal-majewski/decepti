import {server_} from "../../server/module.ts";
import type {RequestEvent} from "./$types.d.ts";
function getNumberOfPlayers(game: server_.core_.game_.Game): number {
	return game.players.size;
}
export async function GET(event: RequestEvent): Promise<Response> {
	return await server_.handlingRequests_.streamEvents(
		event,
		`countOfPlayersOfGameUpdated`,
		getNumberOfPlayers,
	);
}
