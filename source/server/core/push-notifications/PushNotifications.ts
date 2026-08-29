import type {game_} from "../game/module.ts";
import webPush from "web-push";
type Subscription = {
	readonly endpoint: string;
	readonly keys: {readonly auth: string; readonly p256dh: string};
};
export class PushNotifications {
	public constructor(publicKey: string, privateKey: string, email: string) {
		webPush.setVapidDetails(email, publicKey, privateKey);
	}
	public notifyAboutChange(
		previousGame: game_.Game,
		currentGame: game_.Game,
	): void {
		if (previousGame.state === `lobby` && currentGame.state === `planning`) {
			this.sendToAlive(currentGame, `Gra rozpoczęta`, `Czas na zadania!`);
		} else if (
			previousGame.state === `planning`
			&& currentGame.state === `maintaining`
		) {
			this.sendToAlive(
				currentGame,
				`Ruszaj w teren`,
				`Masz zadania do wykonania.`,
			);
		} else if (
			previousGame.state === `maintaining`
			&& currentGame.state === `returning`
		) {
			this.sendToAlive(currentGame, `Zwołano spotkanie`, `Wróć do bazy.`);
		}
		if (currentGame.state === `end` && previousGame.state !== `end`) {
			this.sendToAll(currentGame, `Koniec gry`, `Gra się zakończyła.`);
		}
		if (currentGame.messages.length > previousGame.messages.length) {
			const lastMessage = currentGame.messages[currentGame.messages.length - 1];
			if (lastMessage === undefined) {
				/* empty */
			} else {
				this.sendToAllExcept(
					currentGame,
					lastMessage.idOfAuthor,
					`Nowa wiadomość`,
					lastMessage.text,
				);
			}
		}
		for (const player of currentGame.players.values()) {
			const before = previousGame.players.get(player.id);
			if (before === undefined) {
				continue;
			} else if (
				before.stateOfDeath === `alive`
				&& player.stateOfDeath !== `alive`
			) {
				this.sendTo(player.id, `Nie żyjesz`, `Zostałeś zabity.`);
			} else if (
				before.imprisonment !== `imprisoned`
				&& player.imprisonment === `imprisoned`
			) {
				this.sendTo(player.id, `Więzienie`, `Zostałeś uwięziony.`);
			}
		}
		return;
	}
	private sendTo(idOfPlayer: string, title: string, body: string): void {
		const subscription: Subscription | undefined =
			this.subscriptions.get(idOfPlayer);
		if (subscription === undefined) {
			return;
		} else {
			webPush
				.sendNotification(
					subscription,
					JSON.stringify({body: body, title: title}),
				)
				.catch(function ignoreFailure(): void {
					return;
				});
			return;
		}
	}
	private sendToAlive(game: game_.Game, title: string, body: string): void {
		for (const player of game.players.values()) {
			if (player.stateOfDeath === `alive`) {
				this.sendTo(player.id, title, body);
			} else {
				continue;
			}
		}
		return;
	}
	private sendToAll(game: game_.Game, title: string, body: string): void {
		for (const idOfPlayer of game.players.keys()) {
			this.sendTo(idOfPlayer, title, body);
		}
		return;
	}
	private sendToAllExcept(
		game: game_.Game,
		idOfExcludedPlayer: string,
		title: string,
		body: string,
	): void {
		for (const idOfPlayer of game.players.keys()) {
			if (idOfPlayer === idOfExcludedPlayer) {
				continue;
			} else {
				this.sendTo(idOfPlayer, title, body);
			}
		}
		return;
	}
	public setSubscription(idOfPlayer: string, subscription: Subscription): void {
		this.subscriptions.set(idOfPlayer, subscription);
		return;
	}
	private readonly subscriptions: Map<string, Subscription> = new Map<
		string,
		Subscription
	>();
}
