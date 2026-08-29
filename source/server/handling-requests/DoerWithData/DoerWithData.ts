import type {context_} from "../Context/module.ts";
export type DoerWithData<Data> = (
	context: context_.Context,
	data: Data,
) => void;
