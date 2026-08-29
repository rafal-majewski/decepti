import type {configuration_} from "./configuration/module.ts";
export interface Environment<
	ConfigurationOfAdapterToUse extends
		configuration_.fields_.adapter_.Adapter<string> | null,
	TypeToUse extends string,
> {
	readonly configurationOfAdapter: ConfigurationOfAdapterToUse;
	readonly type: TypeToUse;
	readonly webPush: configuration_.fields_.webPush_.WebPush;
}
