import {base, resolve} from "$app/paths";
function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
	const padding: string = `=`.repeat((4 - (base64.length % 4)) % 4);
	const base64WithPadding: string = (base64 + padding)
		.replace(/-/gu, `+`)
		.replace(/_/gu, `/`);
	const raw: string = atob(base64WithPadding);
	const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(raw.length);
	for (let index: number = 0; index < raw.length; index = index + 1) {
		bytes[index] = raw.charCodeAt(index);
	}
	return bytes;
}
export async function subscribeToPushNotifications(
	idOfGame: string,
	vapidPublicKey: string,
): Promise<void> {
	try {
		if (!(`serviceWorker` in navigator) || !(`PushManager` in window)) {
			return;
		}
		const permission: NotificationPermission =
			await Notification.requestPermission();
		if (permission !== `granted`) {
			return;
		}
		const registration: ServiceWorkerRegistration =
			/* eslint-disable-next-line @typescript-eslint/no-deprecated */
			await navigator.serviceWorker.register(`${base}/service-worker.js`);
		const subscription: PushSubscription =
			await registration.pushManager.subscribe({
				applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
				userVisibleOnly: true,
			});
		await fetch(resolve(`/game/${idOfGame}/push-subscribe`), {
			body: JSON.stringify(subscription.toJSON()),
			headers: {"content-type": `application/json`},
			method: `POST`,
		});
		return;
	} catch {
		return;
	}
}
