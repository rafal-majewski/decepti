import type {core_} from "../../core/module.ts";
import type {context_} from "../Context/module.ts";
export type FeedWithContext<Data> = (
	context: context_.Context,
	game: core_.game_.Game,
) => Data;
