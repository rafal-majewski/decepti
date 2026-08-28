import type {streamWithPromiseOfController_} from "../stream-with-promise-of-controller/module.ts";
export function create<Data>(): streamWithPromiseOfController_.StreamWithPromiseOfController<Data> {
	const promiseAndResolversOfController =
		Promise.withResolvers<ReadableStreamDefaultController<Data>>();
	const stream: ReadableStream<Data> = new ReadableStream<Data>({
		start: function handleStart(
			controller: ReadableStreamDefaultController<Data>,
		): void {
			promiseAndResolversOfController.resolve(controller);
			return;
		},
	});
	const streamWithPromiseOfController: streamWithPromiseOfController_.StreamWithPromiseOfController<Data> =
		{
			promiseOfController: promiseAndResolversOfController.promise,
			stream: stream,
		};
	return streamWithPromiseOfController;
}
