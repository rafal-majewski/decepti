import {core_} from "../../core/module.ts";
import {environment_} from "../environment/module.ts";
import {storageOfGame_} from "../storage-of-game/module.ts";
const pushNotifications: core_.pushNotifications_.PushNotifications =
	new core_.pushNotifications_.PushNotifications(
		environment_.environment.webPush.publicKey,
		environment_.environment.webPush.privateKey,
		environment_.environment.webPush.email,
	);
let previousGame: core_.game_.Game =
	storageOfGame_.storageOfGame.getCurrentGame();
storageOfGame_.storageOfGame.addListener(function notifyAboutChange(
	updatedGame: core_.game_.Game,
): void {
	pushNotifications.notifyAboutChange(previousGame, updatedGame);
	previousGame = updatedGame;
	return;
});
export {pushNotifications};
