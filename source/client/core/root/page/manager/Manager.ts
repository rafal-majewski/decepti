import {resolve} from "$app/paths";
import * as devalue from "devalue";
import {on} from "svelte/events";
export class Manager {
	public static create(
		onNumberOfPlayersUpdated: (numberOfPlayers: number) => void,
	): Manager {
		const eventSource: EventSource = new EventSource(resolve(`/events`));
		const stopperOfHandler: ReturnType<typeof on> = on(
			eventSource,
			`countOfPlayersOfGameUpdated`,
			function handlePlayersCount(event: Event): void {
				if (event instanceof MessageEvent && typeof event.data === `string`) {
					/* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
					const numberOfPlayers: number = devalue.parse(event.data) as number;
					onNumberOfPlayersUpdated(numberOfPlayers);
					return;
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
