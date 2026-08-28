import type {streamWithController_} from "../stream-with-controller/module.ts";
export async function create<Data>(): Promise<
	streamWithController_.StreamWithController<Data>
> {
	const streamWithController: streamWithController_.StreamWithController<Data> =
		await new Promise<streamWithController_.StreamWithController<Data>>(
			function (
				resolve: (
					value: streamWithController_.StreamWithController<Data>,
				) => void,
			): void {
				const stream: ReadableStream<Data> = new ReadableStream<Data>({
					start: function handleStart(
						controller: ReadableStreamDefaultController<Data>,
					): void {
						const resolved: streamWithController_.StreamWithController<Data> = {
							controller: controller,
							stream: stream,
						};
						resolve(resolved);
						return;
					},
				});
				return;
			},
		);
	return streamWithController;
}
