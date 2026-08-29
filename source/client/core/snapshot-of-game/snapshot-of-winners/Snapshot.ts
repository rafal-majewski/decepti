import type {snapshotOfPlayer_} from "../snapshot-of-player/module.ts";
import type {snapshotOfAttitude_} from "./snapshot-of-attitude/module.ts";
export interface Snapshot {
	readonly attitude: snapshotOfAttitude_.Snapshot;
	readonly players: readonly snapshotOfPlayer_.Snapshot[];
}
