import {creatingStreamWithController_} from "./creating-stream-with-controller/module.ts";
import type {streamWithController_} from "./stream-with-controller/module.ts";
import * as devalue from "devalue";
export class EventSender<Data> {
	public static async create<Data>(
		idOfEvent: string,
	): Promise<EventSender<Data>> {
		const streamWithController: streamWithController_.StreamWithController<Uint8Array> =
			await creatingStreamWithController_.create<Uint8Array>();
		const eventSender: EventSender<Data> = new this<Data>(
			idOfEvent,
			streamWithController,
		);
		return eventSender;
	}
	private constructor(
		idOfEvent: string,
		streamWithController: streamWithController_.StreamWithController<Uint8Array>,
	) {
		this.idOfEvent = idOfEvent;
		this.streamWithController = streamWithController;
	}
	private createChunk(data: Data): Uint8Array<ArrayBuffer> {
		const chunk: Uint8Array<ArrayBuffer> = this.encoder.encode(
			`event: ${this.idOfEvent}
data: ${devalue.stringify(data)}

`,
		);
		return chunk;
	}
	private readonly encoder: TextEncoder = new TextEncoder();
	private readonly idOfEvent: string;
	public send(data: Data): void {
		const chunk: Uint8Array = this.createChunk(data);
		try {
			this.streamWithController.controller.enqueue(chunk);
			return;
		} catch {
			return;
		}
	}
	public readonly streamWithController: streamWithController_.StreamWithController<Uint8Array>;
}
