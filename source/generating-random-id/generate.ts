import {randomUUID} from "node:crypto";
export function generate(): string {
	const id: string = randomUUID();
	return id;
}
