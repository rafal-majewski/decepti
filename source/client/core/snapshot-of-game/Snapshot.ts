import type {snapshotOfPlayer_} from "../snapshot-of-player/module.ts";
export interface Snapshot {
	readonly id: string;
	readonly players: readonly snapshotOfPlayer_.Snapshot[];
}
