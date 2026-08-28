export type StreamWithController<Data> = {
	readonly controller: ReadableStreamDefaultController<Data>;
	readonly stream: ReadableStream<Data>;
};
