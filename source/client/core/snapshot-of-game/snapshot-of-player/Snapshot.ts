import type {snapshotOfPerson_} from "./snapshot-of-person/module.ts";
import type {snapshotOfRole_} from "./snapshot-of-role/module.ts";
export interface Snapshot {
	readonly id: string;
	readonly isKnownToBeDead: boolean;
	readonly person: snapshotOfPerson_.Snapshot;
	readonly roles: null | snapshotOfRole_.Snapshot;
}
