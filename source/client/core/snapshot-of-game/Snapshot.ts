import type {snapshotOfMessage_} from "./snapshot-of-message/module.ts";
import type {snapshotOfPlayer_} from "./snapshot-of-player/module.ts";
export interface Snapshot {
	readonly id: string;
	readonly messages: readonly snapshotOfMessage_.Snapshot[];
	readonly players: readonly snapshotOfPlayer_.Snapshot[];
}
