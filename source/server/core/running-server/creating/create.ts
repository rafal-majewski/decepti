import type {environment_} from "../../environment/module.ts";
import {determining_} from "./determining/module.ts";
import type {
	IncomingMessage,
	RequestListener,
	Server,
	ServerResponse,
} from "node:http";
import {dirname} from "node:path";
import {fileURLToPath} from "node:url";
export async function create(
	tls: environment_.configuration_.fields_.adapter_.implementations_.node_.fields_.server_.fields_.bind_.fields_.port_.fields_.tls_.Tls | null,
): Promise<Server<typeof IncomingMessage, typeof ServerResponse>> {
	/*
		eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		----------------------------------------------------------------
		The handler gets generated during the building process, so we need to import it dynamically.
	*/
	const {handler}: {readonly handler: RequestListener} = await import(
		/* @vite-ignore */ `${dirname(fileURLToPath(import.meta.url))}/../../../handler.js`
	);
	const server: Server = await determining_.determine(tls, handler);
	return server;
}
