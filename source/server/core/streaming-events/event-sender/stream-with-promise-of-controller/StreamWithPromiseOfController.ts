export type StreamWithPromiseOfController<Data> = {
	readonly stream: ReadableStream<Data>;
	readonly promiseOfController: Promise<ReadableStreamDefaultController<Data>>;
};
