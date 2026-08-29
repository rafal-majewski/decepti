import type {snapshotOfTask_} from "../snapshot-of-task/module.ts";
export interface Snapshot {
	readonly idOfPlayer: string;
	readonly nameOfPlayer: string;
	readonly tasks: readonly (null | snapshotOfTask_.Snapshot)[];
}
