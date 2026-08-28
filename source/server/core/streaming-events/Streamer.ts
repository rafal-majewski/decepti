import {eventSender_} from "./event-sender/module.ts";
export class Streamer<Data> {
	public static async create<Data>(idOfEvent: string): Promise<Streamer<Data>> {
		const eventSender: eventSender_.EventSender<Data> =
			await eventSender_.EventSender.create<Data>(idOfEvent);
		const response: Response = new Response(
			eventSender.streamWithController.stream,
			{
				headers: {
					"cache-control": `no-cache`,
					"connection": `keep-alive`,
					"content-type": `text/event-stream`,
				},
			},
		);
		const streamer: Streamer<Data> = new Streamer<Data>(eventSender, response);
		return streamer;
	}
	private constructor(
		eventSender: eventSender_.EventSender<Data>,
		response: Response,
	) {
		this.eventSender = eventSender;
		this.response = response;
	}
	private readonly eventSender: eventSender_.EventSender<Data>;
	public feed(data: Data): void {
		this.eventSender.send(data);
		return;
	}
	public readonly response: Response;
}
