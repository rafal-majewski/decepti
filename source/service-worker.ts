/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;
self.addEventListener(`push`, function handlePush(event: PushEvent): void {
	const data: {readonly body?: string; readonly title?: string} =
		/* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
		(event.data?.json() ?? {}) as {
			readonly body?: string;
			readonly title?: string;
		};
	event.waitUntil(
		self.registration.showNotification(data.title ?? `Decepti`, {
			body: data.body ?? ``,
			icon: `/favicon-192x192.svg`,
		}),
	);
	return;
});
self.addEventListener(
	`notificationclick`,
	function handleNotificationClick(event: NotificationEvent): void {
		event.notification.close();
		event.waitUntil(self.clients.openWindow(self.registration.scope));
		return;
	},
);
