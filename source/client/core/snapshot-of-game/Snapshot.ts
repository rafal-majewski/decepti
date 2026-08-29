import type {snapshotOfCurrentPlayer_} from "./snapshot-of-current-player/module.ts";
import type {snapshotOfLocation_} from "./snapshot-of-location/module.ts";
import type {snapshotOfMessage_} from "./snapshot-of-message/module.ts";
import type {snapshotOfPlayer_} from "./snapshot-of-player/module.ts";
import type {snapshotOfState_} from "./snapshot-of-state/module.ts";
import type {snapshotOfTask_} from "./snapshot-of-task/module.ts";
import type {snapshotOfWinners_} from "./snapshot-of-winners/module.ts";
export interface Snapshot {
	readonly currentPlayer: snapshotOfCurrentPlayer_.Snapshot;
	readonly id: string;
	readonly locations: readonly snapshotOfLocation_.Snapshot[];
	readonly messages: readonly snapshotOfMessage_.Snapshot[];
	readonly nameOfState: string;
	readonly numberOfRemainingTasks: number;
	readonly players: readonly snapshotOfPlayer_.Snapshot[];
	readonly state: snapshotOfState_.Snapshot;
	readonly tasks: null | readonly snapshotOfTask_.Snapshot[];
	readonly winners: null | snapshotOfWinners_.Snapshot;
}
