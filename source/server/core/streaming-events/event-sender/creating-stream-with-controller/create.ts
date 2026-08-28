import {creatingStreamWithPromiseOfController_} from "../creating-stream-with-promise-of-controller/module.ts";
import type {streamWithController_} from "../stream-with-controller/module.ts";
import type {streamWithPromiseOfController_} from "../stream-with-promise-of-controller/module.ts";
export async function create<Data>(): Promise<
	streamWithController_.StreamWithController<Data>
> {
	const streamWithPromiseOfController: streamWithPromiseOfController_.StreamWithPromiseOfController<Data> =
		creatingStreamWithPromiseOfController_.create<Data>();
	const controller: ReadableStreamDefaultController<Data> =
		await streamWithPromiseOfController.promiseOfController;
	const streamWithController: streamWithController_.StreamWithController<Data> =
		{controller: controller, stream: streamWithPromiseOfController.stream};
	return streamWithController;
}
