import type {ActionFailure} from "@sveltejs/kit";
export type Result = ActionFailure<{readonly issues: string}>;
