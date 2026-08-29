import {resolve} from "$app/paths";
import type {core_} from "../../core/module.ts";
import {importingInstances_} from "../../importing-instances/module.ts";
import type {doer_} from "../Doer/module.ts";
import type {result_} from "../Result/module.ts";
import {fail, redirect} from "@sveltejs/kit";
export async function handleAction(
	idOfPlayer: null | string,
	idOfGame: string,
	doer: doer_.Doer,
): Promise<result_.Result> {
	if (idOfPlayer === null) {
		const result: result_.Result = fail(403, {
			issues: `Nie masz identyfikatora gracza.`,
		});
		return result;
	} else {
		const instances_ = await importingInstances_.import_();
		const currentGame: core_.game_.Game =
			instances_.storageOfGame_.storageOfGame.getCurrentGame();
		if (currentGame.id === idOfGame) {
			const player: core_.player_.Player | undefined =
				currentGame.players.get(idOfPlayer);
			if (player === undefined) {
				const result: result_.Result = fail(403, {
					issues: `Nie jesteś graczem tej gry.`,
				});
				return result;
			} else {
				doer({
					player: player,
					storageOfGame: instances_.storageOfGame_.storageOfGame,
				});
				redirect(303, resolve(`/game/${currentGame.id}`));
			}
		} else {
			const result: result_.Result = fail(404, {issues: `Gra nie istnieje.`});
			return result;
		}
	}
}
