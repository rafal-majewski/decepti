import {resolve} from "$app/paths";
import type {snapshotOfGame_} from "../../snapshot-of-game/module.ts";
import * as devalue from "devalue";
import {on} from "svelte/events";
export class Manager {
	public static create(
		idOfGame: string,
		onGameUpdated: (game: null | snapshotOfGame_.Snapshot) => void,
	): Manager {
		const eventSource: EventSource = new EventSource(
			resolve(`/game/${idOfGame}/events`),
		);
		const stopperOfHandler: ReturnType<typeof on> = on(
			eventSource,
			`gameUpdated`,
			function handleGameUpdated(event: Event): void {
				if (event instanceof MessageEvent && typeof event.data === `string`) {
					/* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
					const updatedGame: null | snapshotOfGame_.Snapshot = devalue.parse(
						event.data,
					) as null | snapshotOfGame_.Snapshot;
					onGameUpdated(updatedGame);
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
