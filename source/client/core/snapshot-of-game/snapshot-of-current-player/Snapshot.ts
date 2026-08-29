import type {snapshotOfAssignment_} from "../snapshot-of-assignment/module.ts";
import type {snapshotOfTask_} from "../snapshot-of-task/module.ts";
import type {snapshotOfOption_} from "./snapshot-of-option/module.ts";
import type {snapshotOfTarget_} from "./snapshot-of-target/module.ts";
export interface Snapshot {
	readonly assignments: readonly snapshotOfAssignment_.Snapshot[];
	readonly canEscape: boolean;
	readonly canSummon: boolean;
	readonly fellowHostiles: null | readonly snapshotOfOption_.Snapshot[];
	readonly hasAlivePlanner: boolean;
	readonly hasArrivedToBase: boolean;
	readonly id: string;
	readonly idOfPendingPlayer: null | string;
	readonly idOfPendingTask: null | string;
	readonly indexOfPendingSlot: null | number;
	readonly isCaptain: boolean;
	readonly isDoneVoting: boolean;
	readonly isKnownToBeDead: boolean;
	readonly isKnownToBeInJail: boolean;
	readonly isPlanner: boolean;
	readonly nameOfAttitude: null | string;
	readonly nameOfRole: null | string;
	readonly nameOfSkills: null | string;
	readonly plannerCandidates: readonly snapshotOfOption_.Snapshot[];
	readonly summonableDead: readonly snapshotOfOption_.Snapshot[];
	readonly targets: readonly snapshotOfTarget_.Snapshot[];
	readonly tasks: readonly snapshotOfTask_.Snapshot[];
	readonly wantsToStart: boolean;
}
