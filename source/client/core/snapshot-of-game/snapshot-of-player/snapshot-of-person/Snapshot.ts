import type {snapshotOfGender_} from "./snapshot-of-gender/module.ts";
export interface Snapshot {
	readonly gender: snapshotOfGender_.Snapshot;
	readonly name: string;
	readonly urlOfPhoto: string;
}
