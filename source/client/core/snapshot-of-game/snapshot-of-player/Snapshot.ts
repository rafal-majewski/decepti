import type {snapshotOfGender_} from "./snapshot-of-gender/module.ts";
export interface Snapshot {
	readonly gender: snapshotOfGender_.Snapshot;
	readonly id: string;
	readonly name: string;
	readonly urlOfPhoto: string;
}
