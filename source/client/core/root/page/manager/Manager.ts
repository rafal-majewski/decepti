import {resolve} from "$app/paths";
import {on} from "svelte/events";
export class Manager {
	public static create(
		onNumberOfPlayersUpdated: (numberOfPlayers: number) => void,
	): Manager {
		const eventSource: EventSource = new EventSource(resolve(`/events`));
		const stopperOfHandler: ReturnType<typeof on> = on(
			eventSource,
			`playersCount`,
			function handlePlayersCount(event: Event): void {
				if (event instanceof MessageEvent) {
					const numberOfPlayers: number = Number(event.data);
					if (Number.isFinite(numberOfPlayers)) {
						onNumberOfPlayersUpdated(numberOfPlayers);
						return;
					} else {
						return;
					}
				} else {
					return;
				}
			},
		);
		const manager: Manager = new this(eventSource, stopperOfHandler);
		return manager;
	}
	private constructor(
		eventSource: EventSource,
		stopperOfHandler: ReturnType<typeof on>,
	) {
		this.eventSource = eventSource;
		this.stopperOfHandler = stopperOfHandler;
	}
	public destroy(): void {
		this.stopperOfHandler();
		this.eventSource.close();
		return;
	}
	private readonly eventSource: EventSource;
	private readonly stopperOfHandler: ReturnType<typeof on>;
}
