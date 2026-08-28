export type StreamWithPromiseOfController<Data> = {
	readonly promiseOfController: Promise<ReadableStreamDefaultController<Data>>;
	readonly stream: ReadableStream<Data>;
};
