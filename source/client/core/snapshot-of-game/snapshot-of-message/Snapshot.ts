import type {snapshotOfPlayer_} from "../snapshot-of-player/module.ts";
export type Snapshot = {
	readonly author: snapshotOfPlayer_.Snapshot;
	readonly id: string;
	readonly text: string;
	readonly timestamp: Date;
};
